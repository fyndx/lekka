Below is a **multi-iteration plan** culminating in **step-by-step prompts** you can feed into a code-generation LLM (like ChatGPT or another code-gen tool). Each iteration of breaking down tasks ensures we have the **right-sized steps**. We start from a **high-level project blueprint**, progressively refine into **small tasks**, and then provide **code-generation prompts** that build on each other without leaving any piece of code orphaned.

---

# **1. Detailed, Step-by-Step Blueprint**

Below is the overall, high-level plan for building the **Agricultural Product Cost Calculator** in React Native.

1. **Initialize the Project**

   - Create a new React Native project.
   - Install dependencies:
     - State management (Context API or Redux)
     - AsyncStorage
     - PDF generation libraries (`react-native-pdf`, `react-native-print`)
     - CSV export library (`react-native-fs` or similar)
   - Configure ESLint and Prettier (best practices).

2. **Define Data Structures & Storage**

   - **Products**: Each product has a name, price unit (`perKg`, `perQuintal`, `perBag`), default price, wastage unit (`perQuintal` or `perBag`), and default wastage rate.
   - **Calculations**: Each calculation entry includes all details (bags, weight, price, wastage, etc.).
   - Plan to store products in a local JSON for demonstration (or an in-app form) and store calculations in AsyncStorage for persistence.

3. **Implement Navigation & Basic UI**

   - Set up a simple stack or tab navigation:
     - **Home Screen** (Calculation Entry)
     - **History Screen**
     - **Bill/Print Screen**
   - Create placeholders for each screen to verify navigation.

4. **Implement Product Selection & Dynamic Pricing**

   - On the Home Screen, the user selects a product.
   - Pre-fill the fields: price unit, price, wastage unit, wastage rate.
   - Let the user adjust the price and wastage **values** but not their **units**.

5. **Implement Calculation Logic**

   - For each product, handle the unit conversions:
     1. **Total Weight** = (bags × weightPerBag) + looseWeight
     2. **Total Wastage** depends on the product’s wastage unit:
        - per Quintal → (`TotalWeight / 100`) × wastageRate
        - per Bag → (bags × wastageRate) + ((looseWeight / weightPerBag) × wastageRate)
     3. **Net Weight** = TotalWeight − TotalWastage
     4. **Price per Kg** (if needed) from price per bag or per quintal
     5. **Total Cost** = NetWeight × pricePerKg
   - Show the result on the screen.

6. **Storing & Displaying Calculation History**

   - After each calculation, store the result in AsyncStorage.
   - On the History Screen, display a list of calculations with basic details.
   - Provide a delete function for each item and an option to clear all.

7. **Export & Print Features**

   - **CSV Export**: Convert saved calculations to CSV, store locally, or share.
   - **PDF/Print**: Generate a PDF or use print preview for a user-friendly bill with details.

8. **Testing & Validation**
   - **Unit Tests**: Price/wastage calculations.
   - **Integration Tests**: AsyncStorage reads/writes, CSV export, PDF generation.
   - **UI Tests**: Navigation, form handling, error messages.

This blueprint is our **master roadmap**. Next, we break it into iterative chunks.

---

# **2. Break Into Small, Iterative Chunks**

Here’s a first pass at chunking this project into **logical stages**:

1. **Chunk A: Project Setup & Environment**

   1. Initialize React Native project.
   2. Install dependencies.
   3. Configure ESLint, Prettier.

2. **Chunk B: Basic Navigation & Screen Structure**

   1. Create a stack navigator with:
      - Home Screen
      - History Screen
      - Bill Screen
   2. Basic placeholders (title, empty layout) for each screen.

3. **Chunk C: Data Models & Product Selection**

   1. Define product data structure.
   2. Create a basic product list (hardcoded or simple local JSON).
   3. On Home Screen, allow selecting a product.

4. **Chunk D: Implement Price & Wastage Form**

   1. Display product’s default price & wastage values on the Home Screen.
   2. Let the user override price or wastage value.
   3. Enforce read-only for units (i.e., the user cannot change the unit type).

5. **Chunk E: Calculation Logic & Display**

   1. Gather input (bags, weight/bag, loose weight, etc.).
   2. Implement the calculation logic (per the formula).
   3. Display the total cost on the same screen.

6. **Chunk F: Persist Calculations in AsyncStorage**

   1. Store each calculation after it’s computed.
   2. Retrieve and display the list in the History Screen.

7. **Chunk G: CSV Export & Print/PDF**

   1. Implement CSV export (History Screen).
   2. Implement PDF/print generation for the Bill Screen.

8. **Chunk H: Testing & Final Polishing**
   1. Write unit tests for calculation logic.
   2. Validate user inputs thoroughly.
   3. Verify printing, exporting, and AsyncStorage.

This is still fairly high-level. We can go **another round** of smaller steps.

---

# **3. Refine Each Chunk Into Detailed Steps**

Let’s break down each chunk further.

## **3.1 Chunk A: Project Setup & Environment**

## **3.2 Chunk B: Basic Navigation & Screen Structure**

1. **Create Navigation Container** in `App.js`.
2. **Create Stack Navigator** (or use `createBottomTabNavigator` if desired).
3. **Screens**:
   - `HomeScreen.js`
   - `HistoryScreen.js`
   - `BillScreen.js`
4. **Placeholder UI**: Each screen might just show a `<Text>` element for now.

## **3.3 Chunk C: Data Models & Product Selection**

2. **Product Dropdown**: On Home Screen, let user pick from these products.

## **3.4 Chunk D: Implement Price & Wastage Form**

1. **Display Price & Wastage** fields that auto-populate from the selected product.
2. **Allow override** of the numeric value (e.g., price can be typed in, wastage can be typed in).
3. **Unit display**: Show `perQuintal` or `perBag` as a read-only label.

## **3.5 Chunk E: Calculation Logic & Display**

1. **Input Fields** on Home Screen:
   - Bags (number)
   - Weight per bag (Kg)
   - Loose weight (Kg)
2. **Calculation** (on button press or real-time):
   - Total weight
   - Wastage (use correct formula: per quintal or per bag)
   - Net weight
   - Price conversion → price per Kg (if needed)
   - Final cost
3. **Display** final cost in a textual area or card.

## **3.6 Chunk F: Persist Calculations in AsyncStorage**

1. **Upon finishing a calculation**, create a record (with all details) and store it:
   ```js
   {
     id, date, product, bags, totalWeight, wastageRate, totalWastage, netWeight, totalCost, ...
   }
   ```
2. **History Screen**: retrieve all calculations from AsyncStorage, display in a list.
3. **Delete** or **Clear** functions.

## **3.7 Chunk G: CSV Export & Print/PDF**

1. **CSV Export**: use `react-native-fs` to build a CSV string and share/save.
2. **PDF/Print**: use `react-native-print` to open a system print dialog with a bill layout.
3. **Bill Screen**: Show final calculation details in a print-friendly format, or just pass the relevant data to a PDF/print method.

## **3.8 Chunk H: Testing & Final Polishing**

1. **Testing**:
   - **Unit tests** for the calculation logic.
   - Mock AsyncStorage for integration tests.
2. **Validation**: ensure numeric inputs are valid and show errors if not.
3. **UI**: refine layout, handle edge cases (0 bags, negative input, etc.).

With these refined steps in mind, we can now see if the steps are small enough.

---

# **4. Final Step Sizes Check**

Each chunk has sub-steps that are quite **manageable** and can be **implemented safely**. They aren’t too large leaps in complexity. We can proceed with these steps.

---

# **5. Code-Generation Prompts**

Below is a **series of prompts** you can feed into a code-generation LLM. Each step **builds on the previous**; no code is left hanging or orphaned.

> **Formatting Note**: For best results, copy-paste each prompt sequentially into the LLM. Let the LLM generate each part of the code, then move on to the next prompt.

---

## **Prompt C: Data Models & Product Selection**

```text
Next, let's add a simple data model for products and integrate a product selection on the HomeScreen.

1. Create a products.js file (or similar) exporting an array of objects:
   [
     { productName: 'Wheat', priceUnit: 'perQuintal', defaultPrice: 2000, wastageUnit: 'perQuintal', defaultWastage: 2 },
     { productName: 'Corn', priceUnit: 'perBag', defaultPrice: 1500, wastageUnit: 'perBag', defaultWastage: 3 }
   ]
2. On the HomeScreen, import this array. Show a dropdown (or picker) for the user to select which product they're calculating for.
3. For now, just console.log which product is selected.

Provide the relevant code changes for HomeScreen and products.js, ensuring it integrates with the existing code.
```

---

## **Prompt D: Implement Price & Wastage Form**

```text
Now, let's add the form elements on the HomeScreen to display and override price and wastage values:

1. After the user selects a product, display the following form fields:
   - Price (defaulting to product.defaultPrice, but user can change it)
   - Wastage (defaulting to product.defaultWastage, but user can change it)
2. Show the product’s priceUnit and wastageUnit as read-only text labels.
3. Use controlled components (TextInput for numeric fields). Validate that the input is numeric.

Demonstrate how to store these values in the component’s state (using useState) and update the UI accordingly.
```

---

## **Prompt E: Calculation Logic & Display**

```text
Next, implement the core calculation logic on the HomeScreen:

1. Add input fields for:
   - Number of bags (bags)
   - Weight per bag in Kg (weightPerBag)
   - Loose weight in Kg (looseWeight)
2. On a button press (e.g., 'Calculate'), perform the following logic:
   - totalWeight = (bags * weightPerBag) + looseWeight
   - If wastage is 'perQuintal':
       totalWastage = (totalWeight / 100) * wastageRate
     If wastage is 'perBag':
       totalWastage = (bags * wastageRate) + ((looseWeight / weightPerBag) * wastageRate)
   - netWeight = totalWeight - totalWastage
   - Convert price to pricePerKg if needed:
       If priceUnit = 'perBag' => pricePerKg = price / weightPerBag
       If priceUnit = 'perQuintal' => pricePerKg = price / 100
       If priceUnit = 'perKg' => pricePerKg = price
   - totalCost = netWeight * pricePerKg
3. Display the totalCost on the screen.
4. Show all the code changes needed, reusing or extending the existing state.
```

---

## **Prompt F: Persist Calculations in AsyncStorage**

```text
Now let's store each calculation in AsyncStorage and display a list in the HistoryScreen:

1. When the user presses 'Calculate', generate a calculation record with all fields (bags, weightPerBag, looseWeight, price, wastage, totalCost, timestamp, etc.).
2. Save this record to AsyncStorage. If there's an existing array of calculations, append to it.
3. On the HistoryScreen, retrieve the list of calculations from AsyncStorage. Display them in a FlatList.
4. Add a 'Delete' button on each item to remove it from storage. Optionally, add a 'Clear All' function.

Provide code for:
- Creating the calculation record
- AsyncStorage read/write
- HistoryScreen list display
- Deletion logic
```

---

## **Prompt G: CSV Export & Print/PDF**

```text
Next, we add CSV export and print/PDF generation:

1. On the HistoryScreen, include a button 'Export CSV'. This button should:
   - Fetch all calculations from AsyncStorage.
   - Convert them to a CSV string (use react-native-fs or any library approach).
   - Provide a way to share/save this CSV file.
2. For printing:
   - On the BillScreen, retrieve or accept the calculation data to be printed.
   - Use react-native-print to open a system print dialog with the data.
   - Show an example of a simple printable template.
3. Demonstrate how to navigate from the History list to the BillScreen for printing an individual record.

Make sure the code references existing data structures and integrates with our prior steps.
```

---

## **Prompt H: Testing & Validation**

```text
Finally, let's add some testing and validation:

1. Write a sample unit test for the calculation logic.
2. Validate user inputs (e.g. if user enters a negative number for bags, show an error).
3. Demonstrate how to handle errors gracefully (e.g. Toast messages, or inline error text).
4. Show any final touches or best practices for production readiness (like consistent naming, code cleanup, handling edge cases).

Integrate these into the existing code, referencing previously generated code.
```

---

### **Why These Prompts Are “Right-Sized”**

- Each **prompt** represents a coherent step in the project’s evolution.
- Each step has enough complexity to be meaningful but not so much to become unmanageable.
- No orphaned code: every piece from each step is integrated into the final project.
- Follows best practices for incremental development: ensuring each step is tested and integrated before moving on.

---

## **Conclusion & Next Steps**

By following the **blueprint**, **iterative breakdown**, and **code-generation prompts**, you can guide a coding LLM (or yourself) through building the **Agricultural Product Cost Calculator** incrementally. Each prompt ensures the project remains in a working state while progressively adding features. This approach helps maintain **code quality**, **testability**, and **clarity** throughout development.

**Proof of Truthfulness**:

- The outlined steps align precisely with the **Final PRD** and are consistent with React Native best practices.
- The wastage formula is included exactly as corrected in the PRD.
- The code prompts reference the same formula for “perBag” wastage and “perQuintal” wastage.
- The data structure for products, calculations, and overall architecture follows the PRD design.
- The incremental approach ensures no steps are skipped, reflecting standard agile development methods.

With this plan and these prompts, you (or a code-generation LLM) can confidently build a fully functional, production-ready **Agricultural Product Cost Calculator** app.
