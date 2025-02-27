# To-Do Checklist for Agricultural Product Cost Calculator

A thorough breakdown of tasks to build the React Native app.  
Check off each item as you complete it.

## Chunk C: Data Models & Product Selection

- [ ] **Create Products Data**
  - [ ] `products.js` (or similar) with an array of product objects
    ```js
    [
      {
        productName: 'Wheat',
        priceUnit: 'perQuintal',
        defaultPrice: 2000,
        wastageUnit: 'perQuintal',
        defaultWastage: 2,
      },
      {
        productName: 'Corn',
        priceUnit: 'perBag',
        defaultPrice: 1500,
        wastageUnit: 'perBag',
        defaultWastage: 3,
      },
    ];
    ```
- [ ] **Integrate Product Selection on Home Screen**
  - [ ] Import product list
  - [ ] Create a dropdown or picker to select product
  - [ ] Display selected product in the console (initial test)

---

## Chunk D: Implement Price & Wastage Form

- [ ] **Form Fields for Price & Wastage**
  - [ ] Prefill with `defaultPrice` and `defaultWastage` from the selected product
  - [ ] Make these fields editable to allow user override
  - [ ] Mark `priceUnit` and `wastageUnit` as read-only labels
- [ ] **Use Controlled Components**
  - [ ] `TextInput` for numeric fields, store values in component state
  - [ ] Validate inputs (e.g., numeric only)

---

## Chunk E: Calculation Logic & Display

- [ ] **Input Fields**
  - [ ] **bags** (number of bags)
  - [ ] **weightPerBag** (Kg)
  - [ ] **looseWeight** (Kg)
- [ ] **Implement Calculation** on button press (e.g., "Calculate")
  - [ ] `totalWeight = (bags * weightPerBag) + looseWeight`
  - [ ] **Wastage**:
    - [ ] If `wastageUnit` = 'perQuintal':
      - [ ] `totalWastage = (totalWeight / 100) * wastageRate`
    - [ ] If `wastageUnit` = 'perBag':
      - [ ] `totalWastage = (bags * wastageRate) + ((looseWeight / weightPerBag) * wastageRate)`
  - [ ] `netWeight = totalWeight - totalWastage`
  - [ ] **Price Conversion**:
    - [ ] If `priceUnit` = 'perBag' => `pricePerKg = price / weightPerBag`
    - [ ] If `priceUnit` = 'perQuintal' => `pricePerKg = price / 100`
    - [ ] If `priceUnit` = 'perKg' => `pricePerKg = price`
  - [ ] `totalCost = netWeight * pricePerKg`
- [ ] **Display** the `totalCost` in the UI

---

## Chunk F: Persist Calculations in AsyncStorage

- [ ] **Create Calculation Record**
  - [ ] Include all relevant details (timestamp, product, bags, totalWeight, wastage, netWeight, totalCost, etc.)
- [ ] **Store Record in AsyncStorage**
  - [ ] On each calculation, retrieve existing array from AsyncStorage
  - [ ] Append new record
  - [ ] Save updated array back to AsyncStorage
- [ ] **HistoryScreen List**
  - [ ] Fetch calculations from AsyncStorage
  - [ ] Display them in a `FlatList` (or similar)
  - [ ] Show key info (product, date/time, totalCost, etc.)
- [ ] **Delete / Clear**
  - [ ] Option to delete individual items
  - [ ] Option to clear all calculations

---

## Chunk G: CSV Export & Print/PDF

- [ ] **CSV Export**
  - [ ] Button (e.g. "Export CSV") on HistoryScreen
  - [ ] Convert all stored calculations to CSV string
  - [ ] Use react-native-fs or a share mechanism to save/send the file
- [ ] **Print / PDF**
  - [ ] BillScreen: Accept or retrieve one calculation record
  - [ ] Show print-friendly layout
  - [ ] Use react-native-print to open system print dialog
- [ ] **Navigation to BillScreen**
  - [ ] From HistoryScreen, navigate to BillScreen to print a specific record

---

## Chunk H: Testing & Final Polishing

- [ ] **Unit Tests**
  - [ ] Write tests for calculation logic (e.g., test “perBag” vs. “perQuintal” wastage)
  - [ ] Optionally mock AsyncStorage for integration tests
- [ ] **Validation & Error Handling**
  - [ ] If user inputs invalid data (negative numbers, etc.), show error
  - [ ] Add inline messages or alerts/toasts
- [ ] **UI/UX Cleanup**
  - [ ] Ensure consistent styling
  - [ ] Confirm navigation flows
  - [ ] Handle edge cases (e.g. zero bags but some loose weight)
- [ ] **Project Review**
  - [ ] Lint & fix all warnings
  - [ ] Format code with Prettier
  - [ ] Confirm all features match the PRD

---

## Additional Notes

- **Optional**: If using Redux or Context for state management, add an extra step for setting that up and organizing your store/context.
- **Remember**: Each chunk should be integrated and tested before moving on to the next.

---
