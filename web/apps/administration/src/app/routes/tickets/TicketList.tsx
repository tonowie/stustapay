import * as React from "react";
import { Link, ListItem, ListItemText, Paper, Stack } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { selectTicketAll, useDeleteTicketMutation, useListTicketsQuery } from "@api";
import { useTranslation } from "react-i18next";
import { ButtonLink, ConfirmDialog, ConfirmDialogCloseHandler } from "@components";
import { Ticket } from "@stustapay/models";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Loading } from "@stustapay/components";
import { useCurrencyFormatter } from "src/hooks";
import { ProductRoutes, TicketRoutes } from "@/app/routes";

export const TicketList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const formatCurrency = useCurrencyFormatter();

  const { tickets, isLoading: isTicketsLoading } = useListTicketsQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      tickets: data ? selectTicketAll(data) : undefined,
    }),
  });
  const [deleteTicket] = useDeleteTicketMutation();

  const [ticketToDelete, setTicketToDelete] = React.useState<number | null>(null);
  if (isTicketsLoading) {
    return <Loading />;
  }

  const openConfirmDeleteDialog = (ticketId: number) => {
    setTicketToDelete(ticketId);
  };

  const handleConfirmDeleteTicket: ConfirmDialogCloseHandler = (reason) => {
    if (reason === "confirm" && ticketToDelete !== null) {
      deleteTicket({ ticketId: ticketToDelete })
        .unwrap()
        .catch(() => undefined);
    }
    setTicketToDelete(null);
  };

  const columns: GridColDef<Ticket>[] = [
    {
      field: "name",
      headerName: t("ticket.name") as string,
      flex: 1,
      renderCell: (params) => (
        <Link component={RouterLink} to={TicketRoutes.detail(params.row.id)}>
          {params.row.name}
        </Link>
      ),
    },
    {
      field: "description",
      headerName: t("ticket.description") as string,
      flex: 1,
    },
    {
      field: "product_id",
      headerName: t("ticket.product") as string,
      renderCell: (params) => (
        <Link component={RouterLink} to={ProductRoutes.detail(params.row.product_id)}>
          {params.row.product_name}
        </Link>
      ),
      minWidth: 150,
    },
    {
      field: "price",
      headerName: t("ticket.price") as string,
      type: "number",
      valueFormatter: ({ value }) => formatCurrency(value),
    },
    {
      field: "initial_top_up_amount",
      headerName: t("ticket.initialTopUpAmount") as string,
      type: "number",
      valueFormatter: ({ value }) => formatCurrency(value),
    },
    {
      field: "total_price",
      headerName: t("ticket.totalPrice") as string,
      type: "number",
      valueFormatter: ({ value }) => formatCurrency(value),
    },
    {
      field: "restriction",
      headerName: t("ticket.restriction") as string,
      width: 150,
    },
    {
      field: "actions",
      type: "actions",
      headerName: t("actions") as string,
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          color="primary"
          label={t("edit")}
          onClick={() => navigate(TicketRoutes.edit(params.row.id))}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          color="error"
          label={t("delete")}
          onClick={() => openConfirmDeleteDialog(params.row.id)}
        />,
      ],
    },
  ];

  return (
    <Stack spacing={2}>
      <Paper>
        <ListItem
          secondaryAction={
            <ButtonLink to={TicketRoutes.add()} endIcon={<AddIcon />} variant="contained" color="primary">
              {t("add")}
            </ButtonLink>
          }
        >
          <ListItemText primary={t("tickets")} />
        </ListItem>
      </Paper>
      <DataGrid
        autoHeight
        rows={tickets ?? []}
        columns={columns}
        disableRowSelectionOnClick
        sx={{ p: 1, boxShadow: (theme) => theme.shadows[1] }}
      />
      <ConfirmDialog
        title={t("ticket.delete")}
        body={t("ticket.deleteDescription")}
        show={ticketToDelete !== null}
        onClose={handleConfirmDeleteTicket}
      />
    </Stack>
  );
};
