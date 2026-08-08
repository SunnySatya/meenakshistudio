# TODO: Booking Total Amount from Package

## Goal

When a user selects a package (or admin creates a booking manually), the booking's total amount should automatically be the selected package's price. Admin can still edit the total amount.

## Completed Steps

- [x] 1. Server: auto-resolve package price → `totalAmount` in `createBooking` (`server/controllers/bookingController.js`)
- [x] 2. Client: dynamic package dropdown + show price in public booking form (`client/src/components/Booking.jsx`)
- [x] 3. Admin: added "Add Booking" form that auto-fills total from package but allows editing (`client/src/pages/admin/ManageBookings.jsx`)
- [x] 4. Admin: total amount is already editable in the bookings table (Save button)

## How it works

- **User booking:** chooses a package → backend looks up the Package by name → sets `totalAmount` to that package's price.
- **Admin manual booking:** new "Add Booking" form loads packages; selecting a package auto-fills the Total field (still editable).
- **Admin edit:** the Total field in the bookings table is editable and saved via the Save button.
  </content>
