export const permissions = [
  {
    role: "user",
    actions: ["view_AllProduct", "view_OneProduct"],
  },
  {
    role: "vendor",
    actions: [
      "view_AllProduct",
      "view_OneProduct",
      "view_VendorProduct",
      "add_VendorProduct",
      "delete_VendorProduct",
      "update_VendorProduct",
      "count_VendorProduct",
      "count_AllProduct",
    ],
  },
];
