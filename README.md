# 🚀 CLI Fabric

A powerful command-line tool for generating various types of data including UUIDs, Lorem Ipsum text, and fake data for users, locations, and dates.

![CLI Fabric](https://img.shields.io/badge/CLI%20Fabric-v1.0.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-14%2B-green)
![License](https://img.shields.io/badge/license-MIT-yellow)

## ✨ Features

- 🔑 Generate various types of IDs:
  - UUID v4
  - UUID v5
  - Crypto UUID
  - Nano ID
  - Short ID
  - ULID
- 📝 Generate Lorem Ipsum text
- 👤 Generate fake user data
- 📍 Generate fake location data
- 📅 Generate various date formats
- 📋 Copy to clipboard automatically
- 💾 Save output to file
- 🎯 Interactive CLI mode
- ⚡ Command-line argument support

## 🛠️ Installation

You can use CLI Fabric in three ways:

### 1. Using npx (Recommended for one-time use)

```bash
npx cli-fabric
```

### 2. Install globally

```bash
npm install -g cli-fabric
```

### 3. Install locally

```bash
npm install cli-fabric
```

## 🚀 Usage

### Interactive Mode

Simply run:

```bash
# Using npx
npx cli-fabric

# Or if installed globally
cli-fabric

# Or if installed locally
npx cli-fabric
```

This will start an interactive prompt where you can:

1. Choose the type of data to generate
2. Specify the number of items
3. Set additional parameters (like length for nanoid)
4. Choose to save to a file

### Command Line Mode

```bash
# Using npx
npx cli-fabric uuidv4 --count=5

# Generate Lorem Ipsum text
npx cli-fabric lorem 50

# Generate user data
npx cli-fabric user --count=3

# Generate location data
npx cli-fabric location --count=2

# Generate date data
npx cli-fabric date --count=1

# Save output to file
npx cli-fabric user --count=5 --save=users.json
```

## 📋 Examples

### Generate User Data

```bash
cli-fabric user --count=2
```

Output:

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "username": "johndoe",
    "avatar": "https://avatars.githubusercontent.com/u/123456",
    "birthDate": "1990-01-01",
    "phone": "+1-555-555-5555",
    "website": "https://example.com"
  },
  ...
]
```

### Generate Location Data

```bash
cli-fabric location --count=1
```

Output:

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "country": "United States",
    "zipCode": "10001",
    "latitude": "40.7128",
    "longitude": "-74.0060",
    "timezone": "America/New_York"
  }
]
```

### Generate Date Data

```bash
cli-fabric date --count=1
```

Output:

```json
[
  {
    "past": "2023-01-01T00:00:00.000Z",
    "future": "2025-01-01T00:00:00.000Z",
    "recent": "2024-03-15T00:00:00.000Z",
    "birthdate": "1990-01-01T00:00:00.000Z",
    "weekday": "Monday",
    "month": "March"
  }
]
```

## 🔧 Configuration

The tool supports various command-line arguments:

- `--count=<number>`: Number of items to generate
- `--save=<filename>`: Save output to a file

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Faker.js](https://fakerjs.dev/) for fake data generation
- [Lorem Ipsum](https://loremipsum.io/) for text generation
- All other open-source libraries used in this project

---

Made with ❤️ by [Ashutosh](https://github.com/ashutosh4336)
