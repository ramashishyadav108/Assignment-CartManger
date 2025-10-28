# 🧪 Testing Guide - Mock E-Com Cart

## Complete Feature Testing Checklist

This document provides step-by-step instructions to test every feature of the application.

---

## 🎯 Pre-Testing Setup

### 1. Verify Servers are Running

**Backend (Terminal 1):**
\`\`\`bash
cd backend
node server.js
# Should see: ✅ MongoDB Connected
# Should see: 🚀 Server running on port 5000
\`\`\`

**Frontend (Terminal 2):**
\`\`\`bash
cd frontend
npm run dev
# Should see: Local: http://localhost:5174/
\`\`\`

### 2. Verify Database has Products
\`\`\`bash
cd backend
npm run seed
# Should see: ✅ Sample products seeded successfully
\`\`\`

---

## 📝 Test Cases

### TEST 1: Products Page Display
**What to test:** Products load and display correctly

**Steps:**
1. Open http://localhost:5174 in browser
2. Wait for page to load

**Expected Results:**
- ✅ Page title shows "Products"
- ✅ 10 products display in a grid
- ✅ Each product shows:
  - Product image
  - Product name
  - Price (formatted as $XX.XX)
  - Description
  - "Add to Cart" button
  - Category badge
- ✅ Navbar shows cart icon with badge (0 items initially)
- ✅ Grid is responsive (try resizing browser)

**Error Scenarios:**
- ❌ If products don't load: Check backend is running
- ❌ If "Loading..." persists: Check MongoDB connection
- ❌ If error message appears: Check console for details

---

### TEST 2: Add to Cart - Single Item
**What to test:** Adding one product to cart

**Steps:**
1. Click "Add to Cart" on "Wireless Bluetooth Headphones"
2. Observe the cart badge in navbar

**Expected Results:**
- ✅ Success message appears (toast/notification)
- ✅ Cart badge updates to "1"
- ✅ Button shows loading state briefly
- ✅ No errors in console

**Verify in Backend:**
\`\`\`bash
curl http://localhost:5000/api/cart?sessionId=default-session
\`\`\`
- Should show 1 item
- Total price should be 79.99

---

### TEST 3: Add to Cart - Multiple Items
**What to test:** Adding different products

**Steps:**
1. Click "Add to Cart" on "Smart Fitness Watch" ($199.99)
2. Click "Add to Cart" on "Yoga Mat" ($34.99)
3. Check cart badge

**Expected Results:**
- ✅ Cart badge shows "3" (total items)
- ✅ Each add shows success feedback
- ✅ Can add items rapidly without errors

---

### TEST 4: Add to Cart - Same Item Multiple Times
**What to test:** Quantity increases when adding same product

**Steps:**
1. Click "Add to Cart" on "Wireless Mouse" ($19.99)
2. Click "Add to Cart" on same product again
3. Navigate to cart page

**Expected Results:**
- ✅ Cart badge increases by 1 each time
- ✅ In cart, quantity shows "2" for Wireless Mouse
- ✅ Only one cart item for Wireless Mouse (not duplicate)

---

### TEST 5: View Cart Page
**What to test:** Cart page displays correctly

**Steps:**
1. Click "Cart" in navbar OR click cart icon
2. Observe cart page

**Expected Results:**
- ✅ Page title shows "Shopping Cart"
- ✅ All added items display in list
- ✅ Each item shows:
  - Product image
  - Product name
  - Price per unit
  - Quantity controls (- and + buttons)
  - Current quantity
  - Subtotal (price × quantity)
  - Remove button
- ✅ Total price displayed at bottom
- ✅ Total items count shown
- ✅ "Proceed to Checkout" button visible

---

### TEST 6: Update Quantity - Increase
**What to test:** Increasing item quantity

**Steps:**
1. In cart, find "Smart Fitness Watch"
2. Click the "+" button 3 times
3. Observe changes

**Expected Results:**
- ✅ Quantity increments by 1 each click
- ✅ Quantity display updates (2, 3, 4, 5)
- ✅ Subtotal updates correctly
- ✅ Total price recalculates
- ✅ Cart badge updates
- ✅ Changes persist (refresh page)

**Calculation Check:**
- Original: 1 × $199.99 = $199.99
- After 3 clicks: 4 × $199.99 = $799.96

---

### TEST 7: Update Quantity - Decrease
**What to test:** Decreasing item quantity

**Steps:**
1. Find item with quantity > 1
2. Click the "-" button
3. Observe changes

**Expected Results:**
- ✅ Quantity decreases by 1
- ✅ Subtotal updates correctly
- ✅ Total price recalculates
- ✅ Cannot go below 1 (- button disabled at qty 1)

---

### TEST 8: Remove Item from Cart
**What to test:** Removing items

**Steps:**
1. Click "Remove" button on "Yoga Mat"
2. Observe changes

**Expected Results:**
- ✅ Item disappears immediately
- ✅ Total price recalculates
- ✅ Cart badge decreases
- ✅ If last item: shows "Your cart is empty" message
- ✅ Changes persist (refresh page)

---

### TEST 9: Empty Cart State
**What to test:** UI when cart is empty

**Steps:**
1. Remove all items from cart
2. Observe empty cart page

**Expected Results:**
- ✅ Shows empty cart icon/image
- ✅ Message: "Your cart is empty"
- ✅ "Continue Shopping" button visible
- ✅ No checkout button shown
- ✅ Cart badge shows "0" or hidden

---

### TEST 10: Cart Badge Update
**What to test:** Cart badge reflects total items

**Steps:**
1. Add 2 of Product A
2. Add 3 of Product B
3. Check badge

**Expected Results:**
- ✅ Badge shows "5" (sum of all quantities)
- ✅ Updates immediately after each action
- ✅ Visible on all pages

---

### TEST 11: Checkout Page Access
**What to test:** Navigate to checkout

**Steps:**
1. Ensure cart has items
2. Click "Proceed to Checkout" button
3. Observe checkout page

**Expected Results:**
- ✅ Navigates to /checkout
- ✅ Page title shows "Checkout"
- ✅ Customer information form visible:
  - Name input field
  - Email input field
- ✅ Order summary displayed:
  - List of all cart items
  - Quantity for each
  - Subtotal for each
  - Total price
- ✅ "Complete Order" button visible

---

### TEST 12: Checkout Form Validation
**What to test:** Form validates inputs

**Steps:**
1. Try to submit empty form
2. Enter only name
3. Enter invalid email
4. Enter valid data

**Test Case 1: Empty Form**
- Click "Complete Order" with empty fields
- Expected: Error messages appear
- ❌ "Name is required"
- ❌ "Email is required"

**Test Case 2: Name Only**
- Enter: Name = "John Doe"
- Leave email empty
- Click "Complete Order"
- Expected: ❌ "Email is required"

**Test Case 3: Invalid Email**
- Enter: Email = "notanemail"
- Click "Complete Order"
- Expected: ❌ "Please enter a valid email"

**Test Case 4: Valid Data**
- Enter: Name = "John Doe"
- Enter: Email = "john@example.com"
- Expected: ✅ Form submits successfully

---

### TEST 13: Complete Checkout
**What to test:** Order processing and receipt

**Steps:**
1. Fill valid name and email
2. Click "Complete Order"
3. Observe results

**Expected Results:**
- ✅ Loading indicator appears briefly
- ✅ Receipt modal opens
- ✅ Modal displays:
  - ✅ Success message
  - ✅ Order ID (format: ORD-timestamp-code)
  - ✅ Customer name
  - ✅ Customer email
  - ✅ List of purchased items
  - ✅ Quantity for each item
  - ✅ Price for each item
  - ✅ Total items count
  - ✅ Total price
  - ✅ Timestamp
  - ✅ "Mock Payment" indicator
- ✅ Cart is automatically cleared
- ✅ Cart badge shows "0"

---

### TEST 14: Post-Checkout State
**What to test:** System state after checkout

**Steps:**
1. After completing checkout
2. Close receipt modal
3. Navigate to different pages

**Expected Results:**
- ✅ Cart page shows empty state
- ✅ Cart badge shows "0"
- ✅ Can add new products to cart
- ✅ Previous order doesn't reappear

---

### TEST 15: Responsive Design - Mobile
**What to test:** Mobile view (320px - 767px)

**Steps:**
1. Open browser DevTools
2. Toggle device toolbar
3. Select iPhone or custom (375px)
4. Test all pages

**Expected Results:**
- ✅ Products: 1 column grid
- ✅ Navbar: Compact, hamburger menu (if implemented)
- ✅ Cart items: Stack vertically
- ✅ Buttons: Full width and touch-friendly
- ✅ Text: Readable size
- ✅ Images: Responsive, not distorted
- ✅ No horizontal scroll

---

### TEST 16: Responsive Design - Tablet
**What to test:** Tablet view (768px - 1023px)

**Steps:**
1. Resize browser to 768px width
2. Test all pages

**Expected Results:**
- ✅ Products: 2-3 column grid
- ✅ Cart: Comfortable spacing
- ✅ All features accessible

---

### TEST 17: Responsive Design - Desktop
**What to test:** Desktop view (1024px+)

**Steps:**
1. Resize browser to full screen
2. Test all pages

**Expected Results:**
- ✅ Products: 3-4 column grid
- ✅ Proper use of space
- ✅ Maximum content width (not too wide)

---

### TEST 18: Loading States
**What to test:** Loading indicators

**Steps:**
1. Throttle network (DevTools → Network → Slow 3G)
2. Refresh products page
3. Add item to cart
4. Go to checkout

**Expected Results:**
- ✅ Products page shows loading spinner
- ✅ Add to cart shows loading on button
- ✅ Checkout shows loading during submit
- ✅ No blank screens during loading

---

### TEST 19: Error Handling - Network Error
**What to test:** Behavior when backend is down

**Steps:**
1. Stop backend server
2. Try to load products
3. Try to add to cart

**Expected Results:**
- ✅ Error message displays
- ✅ Message is user-friendly (not technical)
- ✅ Suggests retry or checking connection
- ✅ No app crash

---

### TEST 20: Error Handling - Invalid Data
**What to test:** Backend validation errors

**API Test:**
\`\`\`bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": 999, "quantity": 1}'
\`\`\`

**Expected Results:**
- ✅ Returns 404 error
- ✅ Message: "Product not found"

---

### TEST 21: Navigation
**What to test:** All navigation links

**Steps:**
1. Click each navbar link
2. Use browser back/forward
3. Use breadcrumb links (if any)

**Expected Results:**
- ✅ "Products" link goes to /
- ✅ "Cart" link goes to /cart
- ✅ Cart icon goes to /cart
- ✅ Browser back/forward works
- ✅ Active link highlighted
- ✅ No page refreshes (SPA behavior)

---

### TEST 22: Browser Compatibility
**What to test:** Works in different browsers

**Browsers to Test:**
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Edge

**Expected Results:**
- ✅ All features work
- ✅ Styling consistent
- ✅ No console errors

---

### TEST 23: Data Persistence
**What to test:** Data persists in MongoDB

**Steps:**
1. Add items to cart
2. Stop frontend server
3. Stop backend server
4. Restart both servers
5. Check cart

**Expected Results:**
- ✅ Cart items still present
- ✅ Quantities preserved
- ✅ Total price correct

---

### TEST 24: Multiple Sessions (Advanced)
**What to test:** Different sessions have different carts

**Steps:**
1. Open browser window A (normal)
2. Open browser window B (incognito)
3. Add different items in each
4. Check carts

**Note:** Current implementation uses 'default-session' for all users. In production, each user/session would have unique carts.

---

### TEST 25: API Direct Testing
**What to test:** Backend APIs work independently

Run these curl commands:

**1. Get Products:**
\`\`\`bash
curl http://localhost:5000/api/products
\`\`\`
Expected: JSON array of 10 products

**2. Add to Cart:**
\`\`\`bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'
\`\`\`
Expected: Success response with cart data

**3. Get Cart:**
\`\`\`bash
curl http://localhost:5000/api/cart?sessionId=default-session
\`\`\`
Expected: Cart with items and totals

**4. Checkout:**
\`\`\`bash
curl -X POST http://localhost:5000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"customerName": "Test User", "customerEmail": "test@test.com"}'
\`\`\`
Expected: Receipt with order ID

---

## 🎨 Visual Testing Checklist

### Colors & Styling
- [ ] Primary colors consistent
- [ ] Text readable (good contrast)
- [ ] Buttons have hover states
- [ ] Links are distinguishable
- [ ] Error messages in red/warning color
- [ ] Success messages in green

### Layout
- [ ] Proper spacing and padding
- [ ] Aligned elements
- [ ] Consistent margins
- [ ] No overlapping elements
- [ ] Images sized appropriately

### Typography
- [ ] Font sizes appropriate
- [ ] Headings hierarchy clear
- [ ] Line height comfortable
- [ ] No text overflow

---

## 📊 Performance Testing

### Load Time
- [ ] Products page loads < 2 seconds
- [ ] Cart updates < 500ms
- [ ] No memory leaks (check DevTools Memory tab)

### Network Requests
- [ ] No unnecessary API calls
- [ ] Requests cached where appropriate
- [ ] Failed requests retry gracefully

---

## ✅ Final Verification

Before considering testing complete, verify:

- [ ] All 25 test cases passed
- [ ] No errors in browser console
- [ ] No errors in backend terminal
- [ ] All features demonstrated working
- [ ] Responsive design tested
- [ ] Error scenarios handled gracefully
- [ ] Data persists correctly
- [ ] Code is clean and commented

---

## 🐛 Bug Report Template

If you find issues, document them:

**Bug Title:**

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Behavior:**

**Actual Behavior:**

**Screenshots:**

**Environment:**
- Browser:
- OS:
- Node version:

**Console Errors:**

---

## 🎉 Testing Complete!

If all tests pass, the application is ready for:
- ✅ Code review
- ✅ Demonstration
- ✅ Submission
- ✅ Deployment (if needed)

**Testing performed on:** [Date]
**Tested by:** [Name]
**Result:** [PASS/FAIL]
