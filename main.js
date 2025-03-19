#!/usr/bin/env node

const fs = require('fs');
const { randomUUID } = require('crypto');
const clipboardy = require('clipboardy');
const inquirer = require('inquirer');
const shortid = require('shortid');
const { ulid } = require('ulid');
const { nanoid } = require('nanoid');
const { v4: uuidv4, v5: uuidv5 } = require('uuid');
const { LoremIpsum } = require('lorem-ipsum');
const { faker } = require('@faker-js/faker');
const { version } = require('./package.json');
const chalk = require('chalk').default;

const title = `CLI Fabric v${version}`;
const repo = 'https://github.com/ashutosh4336/cli-fabric';
const website = 'https://thehttp.in/';

console.log(`   
  🚀  ${chalk.green.bold(title)}

  ${chalk.dim(website)}
  ${chalk.dim(repo)}
`);

function generateLoremIpsum(length) {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: { min: 4, max: 8 },
    wordsPerSentence: { min: 5, max: 12 },
  });
  return lorem.generateWords(length);
}

// Graceful exit handler
function exitHandler() {
  console.log('\n👋 Exiting gracefully... Goodbye!');
  process.exit(0);
}

// Listen for CTRL+C
process.on('SIGINT', exitHandler);
process.on('SIGTERM', exitHandler);

async function main() {
  const args = process.argv.slice(2);

  let type,
    count = 1,
    length = 21,
    saveFile = null;

  if (args.length === 0) {
    // Interactive mode
    const answers = await inquirer.default.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Choose generator type:',
        choices: [
          '1. uuidv4',
          '2. uuidv5',
          '3. crypto',
          '4. nanoid',
          '5. shortid',
          '6. ulid',
          '7. lorem',
          '8. user',
          '9. location',
          '10. date',
        ],
      },
      {
        type: 'input',
        name: 'count',
        message: 'How many items to generate?',
        default: '1',
        validate: (input) =>
          /^\d+$/.test(input) ? true : 'Enter a valid number',
        when: (answers) => answers.type.slice(3) !== 'lorem',
      },
      {
        type: 'input',
        name: 'length',
        message: (answers) => {
          const type = answers.type.slice(3).trim();

          return type === 'nanoid'
            ? 'Enter Nano ID length: (default: 21)'
            : type === 'lorem'
            ? 'Enter Lorem Ipsum word count: (default: 21)'
            : '';
        },

        default: '21',

        when: (answers) => {
          const type = answers.type.slice(3).trim();

          return type === 'nanoid' || type === 'lorem';
        },
        validate: (input) => {
          return /^\d+$/.test(input) ? true : 'Enter a valid number';
        },
      },
      {
        type: 'input',
        name: 'saveFile',
        message: 'Save to file? (leave empty to skip)',
      },
    ]);

    type = answers.type.slice(3).trim();
    count = parseInt(answers.count, 10) || 1;
    length = parseInt(answers.length, 10);
    saveFile = answers.saveFile.trim() || null;
  } else {
    // CLI arguments mode
    type = args[0];

    const countArg = args.find((arg) => arg.startsWith('--count='));
    if (countArg) count = parseInt(countArg.split('=')[1], 10) || 1;

    if (type === 'nanoid' || type === 'lorem') {
      const lengthArg = args[1] && !args[1].startsWith('--') ? args[1] : null;
      if (lengthArg) length = parseInt(lengthArg, 10) || 21;
    }

    const saveArg = args.find((arg) => arg.startsWith('--save='));
    if (saveArg) saveFile = saveArg.split('=')[1];
  }

  let results = Array.from({ length: count }, () =>
    generateResult(type, length)
  );

  // Format output based on type
  let output;
  if (['user', 'location', 'date'].includes(type)) {
    output = JSON.stringify(results, null, 2);
  } else {
    output = results.join('\n');
  }

  clipboardy.default.writeSync(output);
  console.log(`Generated:\n${output}\n(Copied to clipboard) ✅`);

  if (saveFile) {
    fs.writeFileSync(saveFile, output);
    console.log(`📂 Saved to ${saveFile}`);
  }
}

function generateResult(type, length) {
  switch (type) {
    case 'uuidv4':
      return uuidv4();

    case 'uuidv5':
      const nameSpace = uuidv4();
      return uuidv5('cli-fabric', nameSpace);

    case 'crypto':
      return randomUUID();

    case 'nanoid':
      return nanoid(length);

    case 'shortid':
      return shortid.generate();

    case 'ulid':
      return ulid();

    case 'lorem':
      return generateLoremIpsum(length);

    case 'user':
      return {
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar(),
        birthDate: faker.date.birthdate(),
        phone: faker.phone.number(),
        website: faker.internet.url(),
      };

    case 'location':
      return {
        id: faker.string.uuid(),
        street: faker.location.street(),
        city: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country(),
        zipCode: faker.location.zipCode(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        timezone: faker.location.timeZone(),
      };

    case 'date':
      return {
        past: faker.date.past().toISOString(),
        future: faker.date.future().toISOString(),
        recent: faker.date.recent().toISOString(),
        birthdate: faker.date.birthdate().toISOString(),
        weekday: faker.date.weekday(),
        month: faker.date.month(),
      };

    default:
      console.error(
        '❌ Invalid type. Use: uuid, crypto, nanoid, shortid, ulid, lorem, user, location, or date'
      );
      process.exit(1);
  }
}

main();
