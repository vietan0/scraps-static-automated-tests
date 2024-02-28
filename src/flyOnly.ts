export type Supe = {
  name: string;
  fly: boolean;
};

export default function flyOnly(source: Supe[]) {
  return source.filter((c) => c.fly === true);
}
