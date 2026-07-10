export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function priceLabel(
  price: { kind: "on-request" } | { kind: "from" | "exact"; amount: string },
  labels: { onRequest: string; from: string },
) {
  if (price.kind === "on-request") {
    return labels.onRequest;
  }

  if (price.kind === "from") {
    return `${labels.from} ${price.amount}`;
  }

  return price.amount;
}
