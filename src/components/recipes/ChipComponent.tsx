import { Button } from "../ui/button";

type ChipComponentProps = {
    values: any[];
    onDelete: (value: any, index: number) => void;
}

export default function ChipComponent({ values, onDelete }: ChipComponentProps) {

    return (
        <div className="flex flex-row gap-1 mt-2 flex-wrap items-center">
            {values.map((value, index) => (
                <div
                    className="flex flex-row gap-1 items-center"
                    style={{
                        border: "1.75px solid #e2e8f0",
                        borderRadius: "0.375rem",
                    }}
                >
                    <p className="rounded-lg bg-gray-900 py-0.5 px-1  italic text-[10px] font-sans text-sm  text-white">
                        {value}
                        <Button
                            className="rounded-lg  bg-gray-900 p-2 ml-2"
                            onClick={() => {
                                onDelete(value, index);
                            }}
                        >
                            X
                        </Button>
                    </p>
                </div>
            ))}
        </div>
    )
}