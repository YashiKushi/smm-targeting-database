import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import CampaignFooter from "@/components/CampaignFooter";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Мокированные данные для демонстрации
const campaignData = [
  {
    name: "Янв",
    impressions: 45000,
    clicks: 2340,
    conversions: 234,
    spend: 15600,
  },
  {
    name: "Фев",
    impressions: 52000,
    clicks: 2780,
    conversions: 312,
    spend: 18400,
  },
  {
    name: "Мар",
    impressions: 48000,
    clicks: 2560,
    conversions: 289,
    spend: 17200,
  },
  {
    name: "Апр",
    impressions: 61000,
    clicks: 3420,
    conversions: 398,
    spend: 22100,
  },
  {
    name: "Май",
    impressions: 58000,
    clicks: 3140,
    conversions: 367,
    spend: 20800,
  },
];

const audienceData = [
  { name: "18-24", value: 35, color: "#9b87f5" },
  { name: "25-34", value: 42, color: "#7E69AB" },
  { name: "35-44", value: 23, color: "#D6BCFA" },
];

const activeCampaigns = [
  {
    id: 1,
    name: "Летняя коллекция 2024",
    status: "Активна",
    budget: 25000,
    spent: 18750,
    ctr: 5.2,
    cpc: 8.5,
  },
  {
    id: 2,
    name: "Ретаргетинг корзины",
    status: "Активна",
    budget: 15000,
    spent: 12300,
    ctr: 7.8,
    cpc: 6.2,
  },
  {
    id: 3,
    name: "Lookalike аудитория",
    status: "На паузе",
    budget: 20000,
    spent: 8900,
    ctr: 4.1,
    cpc: 9.8,
  },
  {
    id: 4,
    name: "Брендинговая кампания",
    status: "Активна",
    budget: 35000,
    spent: 28400,
    ctr: 6.3,
    cpc: 7.1,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-6">
      <CampaignFooter />
    </div>
  );
};

export default Index;
