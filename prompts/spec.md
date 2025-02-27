# **Final PRD – Agricultural Product Cost Calculator App**

This version includes the **corrected wastage per bag formula** and **dynamic price & wastage settings per product**.

---

## **1. Overview**

The **Agricultural Product Cost Calculator** is a **React Native mobile application** that calculates the cost of goods based on the number of bags, weight per bag, additional loose weight, price (per Kg, per Bag, or per Quintal), and wastage (adjustable per Quintal or per Bag). The app stores calculation history locally, allows exporting data as CSV, and provides print/PDF bill generation.

---

## **2. Core Features**

### **2.1 Product-Based Pricing & Wastage Rules**

✅ Each product can have a **predefined price unit**:

- **Per Kg**
- **Per Quintal**
- **Per Bag**  
  ✅ Each product can have a **predefined wastage unit**:
- **Per Quintal** (e.g., Wheat → 2 Kg per Quintal)
- **Per Bag** (e.g., Corn → 3 Kg per Bag)  
  ✅ Users can override the **wastage value per transaction**, but not the unit type.  
  ✅ **Automatic unit conversions** for price per Kg, per Quintal, or per Bag for reference.

### **2.2 Wastage Handling**

✅ **Fixed per product:** Either **Per Quintal** OR **Per Bag**, based on the product.  
✅ **Users can adjust the wastage value**, but the type remains per product settings.  
✅ **Corrected formula for Wastage Per Bag** (accounts for loose weight).

### **2.3 Cost Calculation**

✅ Inputs:

- **Number of full bags**
- **Weight per bag (Kg)** (varies by product)
- **Additional loose weight (Kg)**
- **Price per Kg, per Quintal, or per Bag (defined per product)**
- **Wastage per Quintal OR per Bag (defined per product, but value is adjustable)**

✅ **Calculation Logic:**

1. **Total Weight**  
   \[
   \text{Total Weight} = (\text{Number of Bags} \times \text{Weight per Bag}) + \text{Loose Weight}
   \]

2. **Wastage Calculation**

   - **If Wastage per Quintal is used:**  
     \[
     \text{Total Wastage} = \left( \frac{\text{Total Weight}}{100} \right) \times \text{Wastage Rate per Quintal}
     \]
   - **If Wastage per Bag is used:**  
     \[
     \text{Total Wastage} = (\text{Number of Bags} \times \text{Wastage Rate per Bag}) + \left( \frac{\text{Loose Weight}}{\text{Weight per Bag}} \times \text{Wastage Rate per Bag} \right)
     \]

3. **Net Weight**  
   \[
   \text{Net Weight} = \text{Total Weight} - \text{Total Wastage}
   \]

4. **Price Conversion (if necessary)**

   - **If product price is per Bag**, convert to per Kg:  
     \[
     \text{Price per Kg} = \frac{\text{Price per Bag}}{\text{Weight per Bag}}
     \]
   - **If product price is per Quintal**, convert to per Kg:  
     \[
     \text{Price per Kg} = \frac{\text{Price per Quintal}}{100}
     \]

5. **Total Cost Calculation**  
   \[
   \text{Total Cost} = \text{Net Weight} \times \text{Price per Kg}
   \]

6. **Apply Additional Charges/Discounts (if any).**

---

## **3. Technical Architecture**

### **3.1 Tech Stack**

- **Frontend:** React Native
- **State Management:** Context API (or Redux if needed)
- **Storage:** AsyncStorage (for local storage)
- **PDF & Printing:** `react-native-pdf`, `react-native-print`
- **CSV Export:** `react-native-fs`

### **3.2 Data Handling**

#### **3.2.1 Data Structure for Product Entry (Product-Based Wastage & Pricing)**

```json
{
  "productName": "Wheat",
  "priceUnit": "perQuintal",
  "defaultPrice": 2000,
  "wastageUnit": "perQuintal",
  "defaultWastage": 2
}
```

```json
{
  "productName": "Corn",
  "priceUnit": "perBag",
  "defaultPrice": 1500,
  "wastageUnit": "perBag",
  "defaultWastage": 3
}
```

#### **3.2.2 Data Structure for Stored Calculations**

```json
{
  "id": "20240226123045",
  "date": "2024-02-26T12:30:45",
  "product": "Corn",
  "bags": 10,
  "weightPerBag": 76,
  "looseWeight": 5,
  "totalWeight": 765,
  "wastageUnit": "perBag",
  "wastageRate": 3,
  "totalWastage": 30.2,
  "netWeight": 734.8,
  "priceUnit": "perBag",
  "pricePerBag": 1500,
  "pricePerKg": 19.74,
  "pricePerQuintal": 1974,
  "totalCost": 14506,
  "additionalCharges": 0,
  "finalAmount": 14506
}
```

---

## **4. User Interface (UI/UX) Design**

### **4.1 Main Screens**

✅ **Home Screen** – Enter calculation details.  
✅ **Calculation History** – List of past calculations with delete & export options.  
✅ **Bill Screen** – Printable bill view with PDF/print options.

### **4.2 UI Adjustments for New Features**

- **Price unit dropdown is removed**, since **price is fixed per product**.
- **Wastage input type dropdown is removed**, since **wastage is fixed per product**.
- Users can **still adjust the wastage value**, but not the type.

---

## **5. Error Handling & Validation**

### **5.1 Input Validation**

✅ Ensure valid **numeric values** for all inputs.  
✅ Prevent **negative or zero values** in price, weight, or wastage.  
✅ Ensure at least **one unit of weight** is entered (bags or loose weight).  
✅ **Validate wastage input** based on product settings.

### **5.2 Data Persistence & Recovery**

✅ Store all calculations in **AsyncStorage** to prevent data loss.  
✅ Allow **CSV export** for backups.

---

## **6. Testing Plan**

### **6.1 Unit Testing**

✅ **Price Conversion Tests** (Kg ↔ Quintal ↔ Bag).  
✅ **Wastage Calculation Tests** (Per Quintal vs. Per Bag handling).  
✅ **Total Cost Calculation Tests** (with and without additional charges).  
✅ **CSV Export Tests** (verify data accuracy).

### **6.2 UI/UX Testing**

✅ Ensure correct **input validation** for product-specific units.  
✅ Validate **bill generation format**.

### **6.3 Integration Testing**

✅ **AsyncStorage Validation** (ensure correct history storage).  
✅ **Printing & PDF Download Testing**.  
✅ **History Deletion Functions** (single record & full reset).
