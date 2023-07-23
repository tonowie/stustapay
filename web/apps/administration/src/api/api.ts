import { createEntityAdapter } from "@reduxjs/toolkit";
import {
  Account,
  api as generatedApi,
  Cashier,
  CashierShift,
  CashRegister,
  CashRegisterStocking,
  ConfigEntry,
  Order,
  Product,
  TaxRate,
  Ticket,
  Till,
  TillButton,
  TillLayout,
  TillProfile,
  User,
  UserRole,
} from "./generated/api";
import { convertEntityAdaptorSelectors, generateCacheKeys } from "./utils";

export * from "./generated/api";

const userAdapter = createEntityAdapter<User>({
  sortComparer: (a, b) => a.login.toLowerCase().localeCompare(b.login.toLowerCase()),
});

const accountAdapter = createEntityAdapter<Account>({
  sortComparer: (a, b) => (a.name?.toLowerCase() ?? "").localeCompare(b.name?.toLowerCase() ?? ""),
});

const userRoleAdapter = createEntityAdapter<UserRole>({
  sortComparer: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
});

const productAdapter = createEntityAdapter<Product>({
  sortComparer: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
});

const cashierAdapter = createEntityAdapter<Cashier>({
  sortComparer: (a, b) => a.display_name.toLowerCase().localeCompare(b.display_name.toLowerCase()),
});

const cashierShiftAdapter = createEntityAdapter<CashierShift>({
  sortComparer: (a, b) => a.ended_at.localeCompare(b.ended_at),
});

const configAdaptor = createEntityAdapter<ConfigEntry>({
  selectId: (entry) => entry.key,
  sortComparer: (a, b) => a.key.localeCompare(b.key),
});

const orderAdapter = createEntityAdapter<Order>({ sortComparer: (a, b) => b.id - a.id });

const taxRateAdapter = createEntityAdapter<TaxRate>({
  selectId: (taxRate) => taxRate.name,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const ticketAdapter = createEntityAdapter<Ticket>({
  sortComparer: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
});

const tillAdapter = createEntityAdapter<Till>({
  sortComparer: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
});

const tillLayoutAdapter = createEntityAdapter<TillLayout>({
  sortComparer: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
});

const tillButtonAdapter = createEntityAdapter<TillButton>({
  sortComparer: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
});

const tillProfileAdapter = createEntityAdapter<TillProfile>({
  sortComparer: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
});

const cashRegisterAdapter = createEntityAdapter<CashRegister>({
  sortComparer: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
});

const cashRegisterStockingAdapter = createEntityAdapter<CashRegisterStocking>({
  sortComparer: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
});

export const api = generatedApi.enhanceEndpoints({
  endpoints: {
    listUsers: {
      providesTags: (result) => generateCacheKeys("users", result),
    },
    getUser: {
      providesTags: (result, error, arg) => [{ type: "users", id: arg.userId }],
    },
    listUserRoles: {
      providesTags: (result) => generateCacheKeys("user-roles", result),
    },
    listProducts: {
      providesTags: (result) => generateCacheKeys("products", result),
    },
    getProduct: {
      providesTags: (result, error, arg) => [{ type: "products", id: arg.productId }],
    },
    listCashiers: {
      providesTags: (result) => generateCacheKeys("cashiers", result),
    },
    listConfigEntries: {
      providesTags: (result) => generateCacheKeys("config", result),
    },
    listTaxRates: {
      providesTags: (result) => generateCacheKeys("tax-rates", result),
    },
    getTaxRate: {
      providesTags: (result, error, arg) => [{ type: "tax-rates", id: arg.taxRateName }],
    },
    listTickets: {
      providesTags: (result) => generateCacheKeys("tickets", result),
    },
    getTicket: {
      providesTags: (result, error, arg) => [{ type: "tickets", id: arg.ticketId }],
    },
    listTills: {
      providesTags: (result) => generateCacheKeys("tills", result),
    },
    getTill: {
      providesTags: (result, error, arg) => [{ type: "tills", id: arg.tillId }],
    },
    listTillButtons: {
      providesTags: (result) => generateCacheKeys("till-buttons", result),
    },
    getTillButton: {
      providesTags: (result, error, arg) => [{ type: "till-buttons", id: arg.buttonId }],
    },
    listTillLayouts: {
      providesTags: (result) => generateCacheKeys("till-layouts", result),
    },
    getTillLayout: {
      providesTags: (result, error, arg) => [{ type: "till-layouts", id: arg.layoutId }],
    },
    listTillProfiles: {
      providesTags: (result) => generateCacheKeys("till-profiles", result),
    },
    getTillProfile: {
      providesTags: (result, error, arg) => [{ type: "till-profiles", id: arg.profileId }],
    },
  },
});

export const { selectUserAll, selectUserById, selectUserEntities, selectUserIds, selectUserTotal } =
  convertEntityAdaptorSelectors("User", userAdapter.getSelectors());

export const { selectUserRoleAll, selectUserRoleById, selectUserRoleEntities, selectUserRoleIds, selectUserRoleTotal } =
  convertEntityAdaptorSelectors("UserRole", userRoleAdapter.getSelectors());

export const { selectProductAll, selectProductById, selectProductEntities, selectProductIds, selectProductTotal } =
  convertEntityAdaptorSelectors("Product", productAdapter.getSelectors());

export const { selectCashierAll, selectCashierById, selectCashierEntities, selectCashierIds, selectCashierTotal } =
  convertEntityAdaptorSelectors("Cashier", cashierAdapter.getSelectors());

export const {
  selectCashierShiftAll,
  selectCashierShiftById,
  selectCashierShiftEntities,
  selectCashierShiftIds,
  selectCashierShiftTotal,
} = convertEntityAdaptorSelectors("CashierShift", cashierShiftAdapter.getSelectors());

export const {
  selectConfigEntryById,
  selectConfigEntryAll,
  selectConfigEntryEntities,
  selectConfigEntryIds,
  selectConfigEntryTotal,
} = convertEntityAdaptorSelectors("configEntry", configAdaptor.getSelectors());

export const { selectOrderAll, selectOrderById, selectOrderEntities, selectOrderIds, selectOrderTotal } =
  convertEntityAdaptorSelectors("Order", orderAdapter.getSelectors());

export const { selectTaxRateAll, selectTaxRateById, selectTaxRateEntities, selectTaxRateIds, selectTaxRateTotal } =
  convertEntityAdaptorSelectors("TaxRate", taxRateAdapter.getSelectors());

export const { selectTicketAll, selectTicketById, selectTicketEntities, selectTicketIds, selectTicketTotal } =
  convertEntityAdaptorSelectors("Ticket", ticketAdapter.getSelectors());

export const { selectTillAll, selectTillById, selectTillEntities, selectTillIds, selectTillTotal } =
  convertEntityAdaptorSelectors("Till", tillAdapter.getSelectors());

export const {
  selectTillLayoutAll,
  selectTillLayoutById,
  selectTillLayoutEntities,
  selectTillLayoutIds,
  selectTillLayoutTotal,
} = convertEntityAdaptorSelectors("TillLayout", tillLayoutAdapter.getSelectors());

export const {
  selectTillButtonAll,
  selectTillButtonById,
  selectTillButtonEntities,
  selectTillButtonIds,
  selectTillButtonTotal,
} = convertEntityAdaptorSelectors("TillButton", tillButtonAdapter.getSelectors());

export const {
  selectTillProfileAll,
  selectTillProfileById,
  selectTillProfileEntities,
  selectTillProfileIds,
  selectTillProfileTotal,
} = convertEntityAdaptorSelectors("TillProfile", tillProfileAdapter.getSelectors());

export const {
  selectTillRegisterAll,
  selectTillRegisterById,
  selectTillRegisterEntities,
  selectTillRegisterIds,
  selectTillRegisterTotal,
} = convertEntityAdaptorSelectors("TillRegister", cashRegisterAdapter.getSelectors());

export const {
  selectTillRegisterStockingAll,
  selectTillRegisterStockingById,
  selectTillRegisterStockingEntities,
  selectTillRegisterStockingIds,
  selectTillRegisterStockingTotal,
} = convertEntityAdaptorSelectors("TillRegisterStocking", cashRegisterStockingAdapter.getSelectors());

export const { selectAccountById, selectAccountEntities, selectAccountTotal, selectAccountIds, selectAccountAll } =
  convertEntityAdaptorSelectors("Account", accountAdapter.getSelectors());