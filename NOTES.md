## Overview
**Objective**: Refactor product list page  
**Approach**: Used component-based design with reusable components and separation of concerns between data fetching (hooks) and presentation.

## Key Decisions
1. **Single Commit**
During this task, I prioritized rapid implementation and validation alongside renewing my React knowledge.
Once the structure was solidified, I focused on documentation
For production work, I’d adopt micro-commits as part of my normal workflow.

2. **Changes**
    - 'useCategories' hook centralizes data logic
    - used interfaces instead of types for extension
    - created an App file separate from the index file to Isolate root component logic from rendering
    - created separate UI files using BEM for readability and maintainance
    - created unit tests for each component
    - used semantic elements & Aria labels to ensure accessibility
    - used WebP images for faster loading
    - Added clear user friendly messages for error handling
    - created new components for article card, header and sidebar for separation of concerns, reusability & easier maintainance
    - tried to mimic the real UI of the home24 website when it comes to colors & fonts


## Future Improvements
1. Add pagination to `useCategories` hook
2. Improve UI
3. Style error, loading & empty states
4. use home24 favicon
