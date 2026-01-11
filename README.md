# Digital Wallet QA Automation - KYC Verification Testing

Comprehensive test automation suite for Digital Wallet KYC verification system using Playwright and TypeScript.

## Quick Start - How to Launch

**Step 1: Install Dependencies (Playwright browsers auto-install)**
```powershell
npm install
```

Then install mock app dependencies:
```powershell
cd kyc-mock-app\server
npm install
cd ..\..
```

```powershell
cd kyc-mock-app\client
npm install
cd ..\..
```

**Step 2: Run API Tests (Single Command)**
```powershell
npm run test:api
```
This automatically:
- Starts backend server on port 3000
- Runs 14 API tests
- Stops server when done

Expected: 20 API tests pass, execution time ~20-25 seconds.

**Step 3: Run E2E UI Tests (Single Command)**
```powershell
npm run test:e2e
```
This automatically:
- Starts backend server on port 3000
- Starts frontend on port 3001
- Runs 3 E2E UI tests
- Stops both servers when done

Expected: 3 E2E tests pass, execution time ~10-15 seconds.

**View Test Report:**
```powershell
npm run test:report
```

**View Test Cases:**
Open TestCases.html in browser for interactive table with filtering.

---

## 📋 Project Overview

This project provides automated testing for a fintech digital wallet application's user registration and KYC (Know Your Customer) verification features. The test suite includes both API and end-to-end UI tests, demonstrating a complete quality assurance strategy.

## 📦 Project Deliverables

**Part 1: Test Strategy**
- Location: `TestStrategy.md`
- Coverage: Test types, tools/frameworks, microservices context, external vendor constraints, test environments, test data strategy, quality metrics
- Additional: Smoke/regression test suites, test tagging, multi-environment strategy, Docker integration

**Part 2: Test Cases**
- Location: `TestCases.csv` (Excel/Sheets compatible) and `TestCases.html` (interactive browser view)
- Count: 27 test cases covering user registration, KYC verification, E2E flows, and edge cases
- Format: ID, Category, Title, Preconditions, Steps, Expected Result, Priority
- Coverage: Positive scenarios, negative scenarios, edge cases, boundary testing

**Part 3: Test Automation**
- Location: `tests/` folder with organized test scripts
- Automated Tests: 23 tests (20 API + 3 E2E)
- Framework: Playwright + TypeScript
- Architecture: Page Object Model, API Client pattern, organized scripts
- CI/CD: GitHub Actions workflow (`.github/workflows/tests.yml`)

**Test Implementation Coverage:**
- Successful registration: `tests/api/user-registration.spec.ts`
- KYC status transitions: `tests/api/kyc-verification-status.spec.ts`
- Negative cases (missing fields): `tests/api/user-registration-validation.spec.ts`
- Negative cases (invalid inputs): `tests/api/user-registration-validation.spec.ts`
- Duplicate detection: `tests/api/user-registration-duplicates.spec.ts`
- Edge cases: `tests/api/user-registration-edge-cases.spec.ts`, `tests/api/kyc-verification-edge-cases.spec.ts`
- E2E flows: `tests/e2e/registration-flow.spec.ts`, `tests/e2e/kyc-upload-flow.spec.ts`

### Features Tested
- ✅ User registration with validation
- ✅ KYC document upload and verification
- ✅ Status transitions (no_documents → validating → valid/invalid)
- ✅ Error handling and edge cases
- ✅ Async verification workflows

## 🛠️ Technology Stack

- **Playwright** v1.40+ - Modern browser automation and API testing
- **TypeScript** v5.3+ - Type-safe test code
- **Node.js** v20+ - Runtime environment
- **ESLint** - Code quality and linting

## 📁 Project Structure

```
digit-wallet-task/
├── tests/
│   ├── api/                          # API-level tests
│   │   ├── user-registration.spec.ts # User registration endpoint tests
│   │   └── kyc-verification.spec.ts  # KYC verification endpoint tests
│   ├── e2e/                          # End-to-end UI tests
│   │   ├── registration-flow.spec.ts # Registration user journey
│   │   └── kyc-upload-flow.spec.ts   # KYC upload user journey
│   ├── fixtures/
│   │   ├── test-data.ts              # Test data generators
│   │   └── files/                    # Test documents (PDF, JPG)
│   ├── helpers/
│   │   └── api-client.ts             # Reusable API client
│   └── types/
│       └── index.ts                  # TypeScript interfaces
├── pages/                            # Page Object Models
│   ├── registration.page.ts
│   └── kyc.page.ts
├── playwright.config.ts              # Playwright configuration
├── tsconfig.json                     # TypeScript configuration
├── TestStrategy.md                   # Test strategy document
├── TestCases.md                      # Test cases documentation
└── README.md                         # This file
```

## 🚀 Prerequisites

Before running the tests, ensure you have:

- **Node.js** v20 or higher ([Download](https://nodejs.org/))
- **npm** v10 or higher (comes with Node.js)
- **Git** (optional, for version control)

## 📦 Installation

### 1. Clone or Navigate to Project

```bash
cd C:\Users\Domas\Desktop\digit-wallet-task
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Playwright and browser binaries
- TypeScript and type definitions
- ESLint and related plugins

### 3. Install Playwright Browsers

```bash
npx playwright install
```

### 4. Set Up Mock KYC Application

The tests require the mock KYC application to be running:

```bash
# Terminal 1 - Start backend server
cd kyc-mock-app/server
npm install
npm start
# Server runs on http://localhost:3000

# Terminal 2 - Start frontend (optional, for E2E tests)
cd kyc-mock-app/client
npm install
npm start
# Client runs on http://localhost:3001
```

## 🧪 Running Tests

### Run All Tests

```bash
npm test
```

### Run API Tests Only

```bash
npm run test:api
```

### Run E2E Tests Only

```bash
npm run test:e2e
```

### Run Tests in Headed Mode (See Browser)

```bash
npm run test:headed
```

### Debug Tests

```bash
npm run test:debug
```

### Run Specific Test File

```bash
npx playwright test tests/api/user-registration.spec.ts
```

### Run Tests with Specific Browser

```bash
npx playwright test --project=chromium
```

## 📊 Viewing Test Reports

After test execution, view the HTML report:

```bash
npm run test:report
```

This opens an interactive report showing:
- Test results (pass/fail)
- Execution time
- Screenshots on failure
- Video recordings (if enabled)
- Trace files for debugging

## 🔍 Code Quality

### Run Linting

```bash
npm run lint
```

### Fix Linting Issues Automatically

```bash
npm run lint:fix
```

### Linting Rules
- 0 errors, 0 warnings required
- Strict TypeScript enabled
- No `any` types allowed
- Max nesting depth: 2 levels
- Max nested callbacks: 3
- No await in loops

## 📝 Test Coverage

### API Tests (10 test cases)
- ✅ Successful registration with valid data
- ✅ Invalid email format validation
- ✅ Invalid phone number validation
- ✅ Short password validation
- ✅ Missing required fields
- ✅ Duplicate email/phone detection
- ✅ User retrieval by ID
- ✅ KYC document upload
- ✅ KYC status transitions
- ✅ Error handling for non-existent users

### E2E Tests (4 test cases)
- ✅ Complete registration flow via UI
- ✅ Validation error display
- ✅ Complete KYC upload flow
- ✅ Feature access control

## 🎯 Key Test Scenarios

### User Registration
- Email must be unique and valid format
- Phone must be unique and 10+ digits
- Password must be 6+ characters
- All fields are required

### KYC Verification
- Supported file types: JPEG, PNG, PDF
- Maximum file size: 5MB
- Files with "valid" in name → approved
- Files without "valid" in name → rejected
- Verification takes 2-20 seconds (async)
- Cannot upload after status is "valid"
- Can retry after status is "invalid"

## 🔧 Configuration

### Environment Variables

Create a `.env` file (optional):

```env
BASE_URL=http://localhost:3001
API_URL=http://localhost:3000/api
```

### Playwright Configuration

Key settings in `playwright.config.ts`:
- **Parallel execution**: 4 workers (local), 1 worker (CI)
- **Retries**: 1 retry (local), 2 retries (CI)
- **Timeout**: Default 30s per test
- **Screenshots**: On failure only
- **Videos**: On failure only
- **Traces**: On first retry

## 🐛 Troubleshooting

### Backend Server Won't Start

**Issue**: Port 3000 already in use

**Solution**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in server.js
```

### Tests Fail with "User not found"

**Issue**: Backend server not running

**Solution**: Ensure `kyc-mock-app/server` is running on port 3000

### E2E Tests Timeout

**Issue**: Frontend not running or slow network

**Solution**: 
- Start frontend: `cd kyc-mock-app/client && npm start`
- Increase timeout in playwright.config.ts

### Linting Errors

**Issue**: TypeScript or ESLint errors

**Solution**:
```bash
npm run lint:fix
```

### Browser Installation Issues

**Issue**: Playwright browsers not installed

**Solution**:
```bash
npx playwright install --with-deps
```

## 📚 Documentation

- **TestStrategy.md** - Comprehensive test strategy covering test types, tools, environments, and quality metrics
- **TestCases.csv** - 27 detailed test cases in CSV format (open in Excel/Google Sheets for best viewing)
- **PROJECT_RULES.md** - Project-specific coding rules and best practices
- **CODING_RULES.md** - Strict coding rules for this project (38 active rules)

## 🏗️ Architecture Highlights

### Page Object Model (POM)
- Encapsulates page interactions
- Reusable across tests
- Maintainable and scalable

### API Client Pattern
- Centralized API calls
- Type-safe responses
- Reusable across test suites

### Test Data Generation
- Dynamic, unique data per run
- Timestamp-based uniqueness
- No hardcoded values

### Separation of Concerns
- Tests focus on behavior
- Page objects handle UI interactions
- Helpers manage API calls
- Fixtures provide test data

## 🚀 CI/CD Integration

### GitHub Actions

The project includes a GitHub Actions workflow (`.github/workflows/tests.yml`):

```bash
# Workflow triggers:
- Push to main branch
- Pull requests
- Manual workflow dispatch

# What it does:
- Installs dependencies
- Runs linting
- Executes all tests
- Uploads test reports as artifacts
```

### Running in CI

Tests are configured to run reliably in CI environments:
- Headless mode by default
- Increased retries (2)
- Single worker for stability
- Artifacts uploaded on failure

## 📈 Performance

- **API Tests**: ~2-3 minutes (includes async verification delays)
- **E2E Tests**: ~2-3 minutes
- **Total Suite**: ~5-6 minutes
- **Parallel Execution**: 4 workers (local)

## 🤝 Contributing

### Code Style
- Use TypeScript strict mode
- Follow ESLint rules (no exceptions)
- Write descriptive test names
- Keep tests independent and isolated
- Use AAA pattern (Arrange, Act, Assert)

### Adding New Tests
1. Create test file in appropriate directory (`tests/api/` or `tests/e2e/`)
2. Follow existing patterns (Page Objects, API Client)
3. Generate unique test data
4. Run linting: `npm run lint`
5. Verify tests pass: `npm test`

## 📞 Support

For issues or questions:
1. Check troubleshooting section above
2. Review test strategy and test cases documentation
3. Examine test execution reports
4. Check Playwright documentation: https://playwright.dev

## 📄 License

MIT License

---

**Project Status**: ✅ Production Ready  
**Test Coverage**: 27 test cases (API + E2E + Edge Cases)  
**Code Quality**: 0 lint errors, 0 warnings  
**Last Updated**: January 2026
