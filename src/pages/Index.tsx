import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
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
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            SMM Центр Управления
          </h1>
          <p className="text-lg text-gray-600">
            Управление таргетированной рекламой и аналитика
          </p>
        </div>

        {/* Основные метрики */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Общий бюджет
              </CardTitle>
              <Icon name="DollarSign" size={20} className="text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">₽95,000</div>
              <p className="text-xs text-green-600 mt-1">
                +12% к прошлому месяцу
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Потрачено
              </CardTitle>
              <Icon name="TrendingUp" size={20} className="text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">₽68,350</div>
              <p className="text-xs text-purple-600 mt-1">72% от бюджета</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                CTR
              </CardTitle>
              <Icon name="MousePointer" size={20} className="text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">5.8%</div>
              <p className="text-xs text-blue-600 mt-1">+0.8% к среднему</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Конверсии
              </CardTitle>
              <Icon name="Target" size={20} className="text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">1,600</div>
              <p className="text-xs text-orange-600 mt-1">
                +24% к прошлому месяцу
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Графики */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Динамика кампаний
              </CardTitle>
              <CardDescription>
                Показы, клики и конверсии по месяцам
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={campaignData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="impressions"
                    stroke="#9b87f5"
                    strokeWidth={3}
                  />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="#7E69AB"
                    strokeWidth={3}
                  />
                  <Line
                    type="monotone"
                    dataKey="conversions"
                    stroke="#D6BCFA"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Аудитория по возрасту
              </CardTitle>
              <CardDescription>Распределение целевой аудитории</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={audienceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {audienceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-4 mt-4">
                {audienceData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {item.name}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Таблица активных кампаний */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Активные кампании
            </CardTitle>
            <CardDescription>
              База данных всех рекламных кампаний
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Название кампании
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Статус
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Бюджет
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Потрачено
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      CTR
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      CPC
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activeCampaigns.map((campaign) => (
                    <tr
                      key={campaign.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium text-gray-900">
                        {campaign.name}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            campaign.status === "Активна"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        ₽{campaign.budget.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        ₽{campaign.spent.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {campaign.ctr}%
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        ₽{campaign.cpc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Быстрые действия */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Icon name="Plus" size={32} className="mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Создать кампанию</h3>
              <p className="text-purple-100">
                Запустить новую рекламную кампанию
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Icon name="Users" size={32} className="mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Аудитории</h3>
              <p className="text-blue-100">Управление целевыми аудиториями</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Icon name="BarChart3" size={32} className="mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Отчеты</h3>
              <p className="text-green-100">Детальная аналитика результатов</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
