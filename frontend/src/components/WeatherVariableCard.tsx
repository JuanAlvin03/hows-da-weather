
interface WeatherVariable {
    label: string;
    value: string | number | null;
}

function WeatherVariableCard({ weatherVariable}: { weatherVariable: WeatherVariable | null }) {
    if (!weatherVariable) return null;

    return (
        <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-lg transition-all cursor-pointer w-96">
            <div className="p-4">
                <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                    {weatherVariable.label}
                </h5>
                <p className="text-slate-600 leading-normal font-light">
                    {weatherVariable.value !== null ? weatherVariable.value : 'N/A'}
                </p>
            </div>
        </div>
    );
}

export default WeatherVariableCard;