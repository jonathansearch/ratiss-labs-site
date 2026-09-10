import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalibrationData } from '../types';

const data: CalibrationData[] = [
  { niveau: 0.00, p_sig: 2.35 },
  { niveau: 0.25, p_sig: 0.82 },
  { niveau: 0.50, p_sig: 0.38 },
  { niveau: 0.75, p_sig: 0.31 },
  { niveau: 1.00, p_sig: 0.29 }
];

export function ValidationChart() {
  return (
    <div className="w-full h-[400px] bg-black/50 p-4 rounded-xl border border-white/5">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          <XAxis 
            dataKey="niveau" 
            stroke="#71717a" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#71717a" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.toFixed(1)}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#f4f4f5' }}
            itemStyle={{ color: '#22d3ee' }}
          />
          <Line 
            type="monotone" 
            dataKey="p_sig" 
            stroke="#22d3ee" 
            strokeWidth={2}
            dot={{ fill: '#22d3ee', strokeWidth: 2, r: 4, stroke: '#000' }}
            activeDot={{ r: 6, stroke: '#22d3ee', strokeWidth: 2, fill: '#000' }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 flex flex-col gap-2">
        <p className="text-sm text-zinc-400 font-medium">
          Calibration Sensibilité P<sub>sig</sub> : Seuil P<sub>sig</sub> ~0.12
        </p>
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 w-fit">
          Validation PushT Réelle : 25 650 frames traitées sans erreur
        </div>
      </div>
    </div>
  );
}
