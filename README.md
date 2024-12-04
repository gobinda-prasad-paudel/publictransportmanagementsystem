# Public Transportation Management System (PTMS)

**PTMS** consists of both hardware components and software.

### **Bus Unit**: This unit is fitted on the bus.

| Hardware Component                          | Implementation Status |
|---------------------------------------------|-----------------------|
| NFC Reader                                  | (Implemented)         |
| NFC Card (for payment, re-loadable)         | (Implemented)         |
| Display (To show payment status)            | (Implemented)         |
| Button (for sending multiple signals to admin) | (Implemented)     |
| ESP-32                                      | (Implemented)         |

### **Admin Unit**: This unit is used for enrolling NFC cards from the admin panel.

| Hardware Component                          | Implementation Status |
|---------------------------------------------|-----------------------|
| NFC Reader                                  | (Implemented)         |
| NFC Card (for payment, re-loadable)         | (Implemented)         |
| Laptop                                      | (Implemented)         |
| Cable                                       | (Implemented)         |

### **Software**: There are two software applications—one for customers and another for the admin panel. Due to time constraints, we were unable to completely develop both the web app (admin) and the mobile app (customers).

### **Highlighted Features**:

1. Driver can send an emergency **SOS** signal to the admin panel in case of fire, fighting, or any unusual incident.
2. Displays **remaining seats** on a particular bus.
3. Displays the **safety rating** of a particular bus.
4. Government authorities can monitor all activities of citizens.
5. Users can easily detach the **lost** card from the app.
6. Displays the **estimated time** for a bus to arrive at a particular bus stop.
7. Easy to **file a complaint** via the mobile app (if anything happens to you on the bus).
8. Easy to **report lost and found** items.
9. Allows users to **top up the card using a gift card**.

Customers can top up their transport card by scanning the QR code of a gift card (the design of the QR code is also provided in Figma).

We also have the Figma UI design for both the apps.

[Link to Figma](https://www.figma.com/design/tTodauED34iOVlHtgvL5Xa/PTMS?node-id=0-1&t=8yPJngUGAp30ogWa-1)
