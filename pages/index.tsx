import { useState, useMemo } from "react";

type Disks = {
  weight: number;
  count: number;
};
type PercentageDisks = {
  percentage: number;
  disks: Disks[];
};

const bar = 15;
const percentages = [50, 60, 70, 75, 80, 85, 90, 95];
const availableDisks = [15, 10, 5, 2.5, 2, 1.5, 1, 0.5];

export default function Home() {
  const [weight, setWeight] = useState<number | null>(null);
  const diskByPercentage = useMemo((): PercentageDisks[] => {
    if (weight === null) return [] as PercentageDisks[];
    return percentages
      .filter((percentage) => weight * (percentage / 100) - bar > 0)
      .map((percentage) => {
        const disks: Disks[] = [];
        let rest = weight * (percentage / 100) - bar;
        let diskIndex = 0;
        while (rest > 0 && diskIndex < availableDisks.length) {
          const disk = availableDisks[diskIndex];
          const count = Math.floor(rest / (disk * 2));
          if (count > 0) {
            disks.push({ weight: disk, count: count * 2 });
          }
          rest = rest - count * disk * 2;
          diskIndex = diskIndex + 1;
        }
        return { percentage, disks };
      });
  }, [weight]);

  return (
    <div className="container mx-auto bg-gray-100 text-gray-900 min-h-screen text-xl">
      <div className="text-4xl pt-4 text-center">🏋️‍♀</div>
      <h1 className="text-4xl text-center text-pink-500">Natisdottir</h1>
      <input
        type="number"
        placeholder="Weight"
        className="text-4xl w-full py-2 px-4 my-4 bg-gray-300"
        value={weight ?? ""}
        onChange={(e) => {
          const val = e.currentTarget.value;
          const valNumber = val.length === 0 ? null : parseFloat(val);
          setWeight(valNumber);
        }}
      />

      {diskByPercentage.map((diskPercentage) => (
        <div key={diskPercentage.percentage}>
          <div className="bg-gray-600 text-white py-2 px-4">
            {diskPercentage.percentage}% ={" "}
            {(weight * diskPercentage.percentage) / 100}kg (
            {(weight * diskPercentage.percentage) / 100 - bar}kg)
          </div>
          <div className="pb-4 pt-4 px-4 flex">
            {diskPercentage.disks.map((disk) => (
              <div
                key={disk.weight}
                className="mr-4 border-gray-400 border rounded-lg p-4"
              >
                {disk.count} x {disk.weight}kg
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
