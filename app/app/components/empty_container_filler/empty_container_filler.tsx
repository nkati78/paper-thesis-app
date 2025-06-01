
export default function EmptyContainerFiller (props: { type: string }) {

    const { type } = props;

    const getMessage = (type: string): string => {

        switch (type) {

        case "positions":

            return "Nothing here yet.\nYour future losses go here lol.";

        case "watchlist":

            return "Your watchlist is empty.\nStart adding stocks to track them!";

        case "transactions":

            return "No transactions recorded.\nYour financial history starts here.";

        default:

            return "Nothing to display.\nPlease update your data.";

        }

    };

    const message = getMessage(type);

    return (
        <div className="flex flex-col items-center w-full h-full min-h-[200px] text-center text-gray-500 py-6 overflow-visible">
            <svg
                className="w-2/3 h-auto sm:w-1/2 md:w-1/3 mb-6"
                viewBox="0 0 240 94"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M2.25526 1C2.25526 1 -12.2883 73.0482 57.6321 88.012C103.211 97.7665 145.452 64.1807 124.757 31.4819C107.461 4.15316 67.8744 6.66895 60.4296 42.5663C52.0391 83.024 91.7543 93 143.216 93C171.185 93 193 83.5783 193 83.5783"
                    stroke="#C2C2C2"
                    strokeWidth="2"
                    strokeDasharray="11 11"
                />
                <path
                    d="M239.451 46.75L198.95 67.6557L181.499 58.1175L239.451 46.75L224.865 84.6416L212.493 76.7068L201.554 84.6416L204.289 71.4448L239.451 46.75Z"
                    fill="#C2C2C2"
                />
            </svg>

            {message.split("\n").map((line, index) => (
                <p key={index}
                    className={
                        index === 0
                            ? "text-2xl font-bold mb-2"
                            : "text-base"
                    }>
                    {line}
                </p>
            ))}
        </div>
    );

}