# QA Automation Project Rules - Digital Wallet KYC Testing

## 🎯 Project Context
This is a QA automation homework task for a fintech digital wallet application with KYC verification.
Time constraint: 2-4 hours for complete deliverables.
Goal: Demonstrate strategic thinking, clean automation, and technical excellence.

## 🛠️ Technology Stack
- **Language**: TypeScript (strict mode)
- **Test Framework**: Playwright
- **Test Types**: API + E2E UI tests
- **Architecture**: Page Object Model (POM)
- **CI/CD**: GitHub Actions ready
- **Reporting**: Playwright HTML reports with screenshots

## 📐 Code Quality Standards

### TypeScript Rules
- Use strict TypeScript configuration
- Explicit types for all function parameters and return values
- No `any` types - use proper typing or `unknown` with type guards
- Use interfaces for data structures and API responses
- Leverage TypeScript enums for status values and constants
- Enable all strict compiler options in tsconfig.json

### Test Code Standards
- **DRY Principle**: No code duplication - extract reusable helpers
- **Single Responsibility**: Each test validates one specific behavior
- **Clear Test Names**: Use descriptive test names that explain the scenario
- **AAA Pattern**: Arrange, Act, Assert structure in all tests
- **Independent Tests**: Each test must run independently (no shared state)
- **Fast Execution**: Optimize for speed - use API setup when possible

### Naming Conventions
- **Files**: kebab-case (e.g., `user-registration.spec.ts`)
- **Classes**: PascalCase (e.g., `RegistrationPage`)
- **Functions/Methods**: camelCase (e.g., `fillRegistrationForm`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
- **Interfaces**: PascalCase with 'I' prefix optional (e.g., `UserData` or `IUserData`)
- **Test descriptions**: Natural language, descriptive

## 🏗️ Architecture Patterns

### Page Object Model (POM)
- One page object per logical page/component
- Encapsulate all selectors within page objects
- Expose only high-level actions (not raw Playwright methods)
- Return page objects for method chaining where appropriate
- Keep assertions in test files, not in page objects

### Test Organization
```
tests/
├── api/           # API-level tests (fast, comprehensive)
├── e2e/           # End-to-end UI tests (critical paths)
├── fixtures/      # Test data, custom fixtures
└── helpers/       # Shared utilities, API clients
```

### Data Management
- Use fixtures for test data generation
- Generate unique test data per test run (emails, phones)
- Store test files in `tests/fixtures/files/` directory
- Use environment variables for configuration
- Never hardcode sensitive data

## ✅ Testing Best Practices

### Test Coverage Strategy
1. **API Tests** (70% of coverage)
   - Fast execution, comprehensive validation
   - Test all endpoints: success, failures, edge cases
   - Validate response schemas and status codes
   - Test business logic thoroughly

2. **E2E Tests** (30% of coverage)
   - Critical user journeys only
   - Happy path + key error scenarios
   - Visual validation where necessary

### Playwright-Specific Rules
- Use `test.describe()` to group related tests
- Use `test.beforeEach()` for common setup
- Leverage auto-waiting (avoid manual waits)
- Use `page.getByRole()`, `page.getByLabel()` over CSS selectors
- Enable trace on first retry for debugging
- Use `expect()` from Playwright, not external assertion libraries
- Configure parallel execution for speed

### Error Handling
- Expect and test error scenarios explicitly
- Use try-catch only when testing error conditions
- Validate error messages and status codes
- Screenshot on failure (configured in playwright.config)

## 📊 Test Documentation

### Test Strategy Document
- Keep to 1-2 pages maximum
- Use clear headings and bullet points
- Include diagrams where helpful (testing pyramid)
- Address all required topics:
  - Test types (unit, integration, E2E, contract)
  - Tools and frameworks (Playwright, TypeScript)
  - Microservices testing approach
  - External vendor mocking strategy
  - Environment management
  - Test data strategy
  - Quality metrics and KPIs

### Test Cases Document
- Use markdown table format for clarity
- Include: ID, Title, Preconditions, Steps, Expected Result
- Cover positive and negative scenarios
- Include edge cases and boundary conditions
- 5-10 high-value test cases (quality over quantity)

### README Documentation
- Clear prerequisites section
- Step-by-step setup instructions
- How to run tests (all, specific suites, single test)
- How to view reports
- Troubleshooting common issues
- Project structure explanation

## 🚀 Performance & Efficiency

### Optimization Rules
- Run tests in parallel (configure workers in playwright.config)
- Use API calls for test setup instead of UI navigation
- Reuse browser contexts where safe
- Minimize test data - only create what's needed
- Use headed mode only for debugging

### CI/CD Considerations
- Tests must be deterministic (no flaky tests)
- Use retry strategy wisely (max 2 retries)
- Generate artifacts: reports, screenshots, traces
- Fast feedback: fail fast on critical errors
- Cache dependencies for faster CI runs

## 🔒 Security & Data Privacy

- Never commit sensitive data or credentials
- Use .env files for configuration (add to .gitignore)
- Generate random test data (don't use real user data)
- Clean up test data after execution where possible
- Follow principle of least privilege

## 📦 Dependencies Management

- Lock dependency versions in package.json
- Keep dependencies minimal and justified
- Use only well-maintained, popular packages
- Document why each dependency is needed
- Regular security audits (`npm audit`)

## 🎨 Code Style

### Formatting
- Use Prettier for consistent formatting (if time permits)
- 2 spaces for indentation
- Single quotes for strings
- Trailing commas in objects/arrays
- Max line length: 100 characters

### Comments
- Write self-documenting code (clear names over comments)
- Add comments only for complex business logic
- Use JSDoc for public APIs and helpers
- Keep comments up-to-date with code changes

## 🎯 Deliverables Checklist

### Must Have (Core Requirements)
- [ ] TestStrategy.md (1-2 pages, all topics covered)
- [ ] TestCases.md (5-10 cases, positive + negative)
- [ ] tests/ folder with working automation
- [ ] README.md with setup instructions
- [ ] Tests validate: registration, KYC status, negative cases
- [ ] Code is CI-friendly and well-structured

### Should Have (Impressive Additions)
- [ ] Page Object Model implementation
- [ ] Both API and E2E tests
- [ ] Custom Playwright fixtures
- [ ] Parallel test execution configured
- [ ] HTML report generation
- [ ] TypeScript with strict mode
- [ ] Clean project structure

### Nice to Have (Bonus Points)
- [ ] GitHub Actions workflow (.github/workflows/tests.yml)
- [ ] Docker support for running tests
- [ ] Test data factories/builders
- [ ] Visual regression testing (screenshots)
- [ ] Performance metrics in reports
- [ ] Allure reporting integration

## 🚫 What to Avoid

- ❌ Over-engineering - keep it simple and functional
- ❌ Flaky tests - ensure reliability over coverage
- ❌ Poor naming - be explicit and descriptive
- ❌ Hardcoded values - use constants and config
- ❌ Mixing concerns - separate test logic from page objects
- ❌ Ignoring TypeScript errors - fix them properly
- ❌ Copy-paste code - extract reusable functions
- ❌ Testing implementation details - test behavior
- ❌ Overly complex test data - keep it minimal
- ❌ Missing error scenarios - test failures too

## 💡 Key Differentiators for This Project

### What Makes This Stand Out
1. **Strategic Thinking**: Test strategy shows understanding of microservices, external dependencies, and real-world constraints
2. **Clean Architecture**: Page Object Model with proper separation of concerns
3. **Comprehensive Coverage**: Both API and UI tests, positive and negative cases
4. **Production-Ready**: CI/CD ready, proper error handling, clean reports
5. **TypeScript Excellence**: Proper typing, no shortcuts, professional code
6. **Documentation**: Clear, concise, professional documentation

### Time Management (2-4 hours)
- **Hour 1**: Setup + TestStrategy.md + TestCases.md
- **Hour 2**: Project structure + Page Objects + API tests
- **Hour 3**: E2E tests + README.md
- **Hour 4**: Polish, CI/CD, bonus features

## 🔄 Testing the KYC Mock App

### Key Behaviors to Test
- Email must be unique (409 on duplicate)
- Phone must be unique (409 on duplicate)
- Email format validation
- Phone format validation (10+ digits)
- Password minimum 6 characters
- File size limit 5MB
- File types: JPEG, PNG, PDF only
- KYC status transitions: no_documents → validating → valid/invalid
- Verification takes 2-20 seconds (async)
- Files with "valid" in name → valid status
- Files without "valid" in name → invalid status
- Cannot upload after KYC is valid
- Can retry upload after invalid status

### API Endpoints to Test
- POST /api/users (registration)
- GET /api/users/:userId (get user)
- POST /api/kyc/:userId (upload document)
- GET /api/kyc/:userId (get KYC status)

## 🎓 Learning & Improvement

- Each test should teach something about the system
- Tests are living documentation
- Refactor tests as you learn patterns
- Balance between DRY and readability
- Optimize for maintainability, not just coverage

---

**Remember**: The goal is to impress with strategic thinking, clean code, and comprehensive testing - not just to complete the task. Quality over quantity. Show you can think like a Lead QA Engineer.
