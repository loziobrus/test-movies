export const formatRuntime = (runtime: number) =>
  `${(runtime / 60).toFixed()}h ${runtime % 60}m`;

export const formatPrice = (price: number) => {
  switch (true) {
    case price / 1000000000 > 1:
      return `$${(price / 1000000000).toFixed(2)}B`;
    case price / 1000000 > 1:
      return `$${(price / 1000000).toFixed(2)}M`;
    case price / 1000 > 1:
      return `$${(price / 1000).toFixed(2)}K`;
    default:
      return `$${price}`;
  }
};
