import type { Order } from "@/lib/platform-types";

type MidtransCustomer = {
  firstName: string;
  email: string;
};

type MidtransTransactionResult = {
  token?: string;
  redirectUrl?: string;
  mode: "placeholder" | "sandbox" | "production";
  message: string;
};

const snapBaseUrl = "https://app.sandbox.midtrans.com/snap/v1/transactions";
const snapProductionUrl = "https://app.midtrans.com/snap/v1/transactions";

export function getMidtransClientKey() {
  return process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "";
}

export async function createMidtransTransaction(
  order: Order,
  customer: MidtransCustomer
): Promise<MidtransTransactionResult> {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";

  if (!serverKey) {
    return {
      mode: "placeholder",
      token: `mock-token-${order.id}`,
      redirectUrl: `/checkout/${order.id}?midtrans=placeholder`,
      message:
        "MIDTRANS_SERVER_KEY belum diisi. Ini response placeholder untuk development.",
    };
  }

  const auth = Buffer.from(`${serverKey}:`).toString("base64");
  const response = await fetch(isProduction ? snapProductionUrl : snapBaseUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transaction_details: {
        order_id: order.id,
        gross_amount: order.amount,
      },
      customer_details: {
        first_name: customer.firstName,
        email: customer.email,
      },
      item_details: [
        {
          id: order.productId,
          price: order.amount,
          quantity: 1,
          name: order.productName,
        },
      ],
      callbacks: {
        finish: `https://solusivendor.com/checkout/${order.id}`,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Gagal membuat transaksi Midtrans.");
  }

  const result = (await response.json()) as {
    token?: string;
    redirect_url?: string;
  };

  return {
    mode: isProduction ? "production" : "sandbox",
    token: result.token,
    redirectUrl: result.redirect_url,
    message: "Transaksi Midtrans berhasil dibuat.",
  };
}
