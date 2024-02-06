export function loader() {
  // fake promise of 250ms
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        tags: [
          {
            id: "1",
            name: "Pasta",
            description: "Pasta with tomato sauce",
            active: true,
          },
        ],
      });
    }, 250);
  });
}
