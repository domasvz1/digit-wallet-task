# Coding Rules

These rules are mandatory for every code change in this project.

1. Never prioritize what is faster to write. Take time to code correctly. We prioritize correctness over speed.
2. Never assume the current codebase is correct or that methods/functions/classes are correct. Always verify.
3. Never add timeouts/delays when adding any code. Use proper wait strategies instead.
4. Never use hardcoded values when adding any code. Use constants and configuration.
5. Never create or use fallback solutions when adding any code. Implement the proper solution.
6. Always add try-catch blocks and throw errors appropriately for user-facing functionality.
7. If you cannot find the root cause with actual code evidence, say "I need more information" - NEVER guess.
8. After you create or update code, run linting on the ENTIRE PROJECT. You must achieve 0 lint errors and 0 lint warnings before reporting completion. No exceptions.
9. If you edit a file that was not touched by linters before, you are obligated to fully fix all linting problems there.
10. NEVER use disable for eslint rules - they are there to improve and help us.
11. "It works at runtime" is NOT a valid reason to skip lint fixes. Rules define code quality standards that go beyond functional correctness.
12. You can only code and fix what is in the architecture - ARCHITECTURE_MAP.json - you must only follow provided functionality flows there, cannot do it by yourself.
13. If you lack any information from architecture file to do a fix, you should say so to me.
14. Maximum lines per file is 300 lines excluding blank lines and comments. If a file exceeds this, immediately refactor into multiple files before reporting completion.
15. Maximum lines per function is 50 lines excluding blank lines and comments. Extract complex logic into separate helper functions.
16. Before creating new files, examine 2-3 similar existing files in the same directory to match their exact pattern.
17. Maximum code block nesting depth is 2 levels. Plan code structure before writing to avoid deep nesting.
18. Maximum nested callbacks is 3. Extract callbacks into named functions if needed.
19. Cyclomatic complexity maximum is 10. Break down complex functions into smaller, focused functions.
20. When calling async methods, ensure they have await expressions.
21. When creating methods, verify if async is truly needed and won't be redundant.
22. Never use await inside loops (for, while, forEach). Use Promise.all() to run async operations in parallel - only use sequential await if operations MUST happen in order due to dependencies.
23. Don't use return await - just return the promise directly unless you need try-catch.
24. Never leave defined but never used objects, variables, functions, or anything else. Remove or connect to functionality.
25. Check for unused methods and functions before shipping code. If unused, remove them entirely.
26. Immediately return the expression instead of assigning it to a temporary variable if possible.
27. Always define a constant instead of duplicating variables or logging strings.
28. Use const by default. Use let only when reassignment is needed. Never use var.
29. When using parseInt() method, always pass the radix parameter.
30. Use nullish coalescing operator (??) instead of logical or (||) as it's safer.
31. Use optional chaining (?.) when accessing potentially null/undefined properties.
32. Functions, methods, and classes must always be reusable - never hardcode specific values in namings.
33. You are not allowed to add comments unless explicitly asked.
34. After creating or refactoring code, always verify all refactored code connects correctly to existing code (functions/methods/classes).
35. After adding ANY method call, immediately grep search for the method definition in the target class. If not found, ADD the method in the same edit session BEFORE moving to next task - never split method calls and definitions across separate edits.
36. Before reporting task completion on refactoring work, search the entire project for references to moved methods/classes using grep to ensure no broken integration points remain.
37. When any tool reports 'inaccuracies', 'we did our best', or similar warnings, you MUST immediately read back the file to verify changes were applied correctly. Never assume partial success is complete success.
38. Use Node.js script for PRECISE line counts (no more PowerShell). Never calculate lines manually.
39. Never tell the user to run commands. If it doesn't require visual confirmation, you must do it yourself.
40. Complete tasks one by one. Prioritize correctness over speed.
41. There is no such thing as "Rule doesn't apply here" - rules must apply everywhere.
42. When writing test files, each test.describe() block must stay under 50 lines excluding blank lines and comments. If a describe block exceeds 50 lines, split into multiple describe blocks by category or create separate test files.
43. After creating or modifying ANY TypeScript file, immediately run npm run lint, fix ALL errors before moving to next task, and never assume "it will pass" - always verify.
44. If a function exceeds 50 lines during development, stop immediately, extract logical blocks into separate helper functions, and re-run linting to verify compliance.
45. Do not create any .MD files unless I explicitly say 'create a file', 'create documentation', or 'update documentation'. Only update existing MD files that are part of project requirements (TestStrategy.md, README.md, CODING_RULES.md). When I say 'tell me' or 'explain', provide the information in your response without creating files.
46. When you change execution flows, commands, scripts, or how the project runs, immediately update ARCHITECTURE_MAP.json executionFlow section and README.md to reflect the changes. All project documentation must stay synchronized with actual implementation.
