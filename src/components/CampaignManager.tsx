import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

interface Campaign {
  id: number;
  name: string;
  status: "Активна" | "На паузе" | "Завершена";
  budget: number;
  spent: number;
  audience: string;
  startDate: string;
  endDate: string;
  objective: string;
  platform: string;
}

const CampaignManager = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 1,
      name: "Летняя коллекция 2024",
      status: "Активна",
      budget: 25000,
      spent: 18750,
      audience: "Женщины 25-35",
      startDate: "2024-05-01",
      endDate: "2024-06-30",
      objective: "Конверсии",
      platform: "Facebook",
    },
    {
      id: 2,
      name: "Ретаргетинг корзины",
      status: "Активна",
      budget: 15000,
      spent: 12300,
      audience: "Посетители сайта",
      startDate: "2024-05-15",
      endDate: "2024-07-15",
      objective: "Конверсии",
      platform: "Instagram",
    },
    {
      id: 3,
      name: "Lookalike аудитория",
      status: "На паузе",
      budget: 20000,
      spent: 8900,
      audience: "Похожие покупатели",
      startDate: "2024-04-20",
      endDate: "2024-06-20",
      objective: "Охват",
      platform: "Facebook",
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);

  // Экспортируемая функция для открытия модального окна
  const openCreateCampaignModal = () => {
    setShowCreateForm(true);
  };

  const [newCampaign, setNewCampaign] = useState({
    name: "",
    budget: "",
    audience: "",
    objective: "",
    platform: "",
    startDate: "",
    endDate: "",
    dailyBudget: "",
    targetCPA: "",
    expectedReach: "",
  });

  // Автоматический расчет бюджета
  const calculateBudget = () => {
    const { dailyBudget, startDate, endDate, targetCPA, expectedReach } =
      newCampaign;

    if (dailyBudget && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
      );
      const totalBudget = Number(dailyBudget) * Math.max(days, 1);

      setNewCampaign((prev) => ({ ...prev, budget: totalBudget.toString() }));
    } else if (targetCPA && expectedReach) {
      const estimatedBudget = Number(targetCPA) * Number(expectedReach);
      setNewCampaign((prev) => ({
        ...prev,
        budget: estimatedBudget.toString(),
      }));
    }
  };

  // Валидация формы
  const validateForm = () => {
    const errors = [];
    if (!newCampaign.name.trim()) errors.push("Название кампании обязательно");
    if (!newCampaign.budget || Number(newCampaign.budget) <= 0)
      errors.push("Бюджет должен быть больше 0");
    if (!newCampaign.platform) errors.push("Выберите платформу");
    if (!newCampaign.objective) errors.push("Выберите цель кампании");

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return false;
    }
    return true;
  };

  const handleCreateCampaign = () => {
    if (!validateForm()) return;

    const campaign: Campaign = {
      id: campaigns.length + 1,
      name: newCampaign.name,
      status: "Активна",
      budget: Number(newCampaign.budget),
      spent: 0,
      audience: newCampaign.audience || "Не указано",
      startDate:
        newCampaign.startDate || new Date().toISOString().split("T")[0],
      endDate: newCampaign.endDate || new Date().toISOString().split("T")[0],
      objective: newCampaign.objective,
      platform: newCampaign.platform,
    };

    setCampaigns([...campaigns, campaign]);
    setNewCampaign({
      name: "",
      budget: "",
      audience: "",
      objective: "",
      platform: "",
      startDate: "",
      endDate: "",
      dailyBudget: "",
      targetCPA: "",
      expectedReach: "",
    });
    setShowCreateForm(false);
  };

  const toggleCampaignStatus = (id: number) => {
    setCampaigns(
      campaigns.map((campaign) =>
        campaign.id === id
          ? {
              ...campaign,
              status: campaign.status === "Активна" ? "На паузе" : "Активна",
            }
          : campaign,
      ),
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Активна":
        return "bg-green-100 text-green-800";
      case "На паузе":
        return "bg-yellow-100 text-yellow-800";
      case "Завершена":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Facebook":
        return "facebook";
      case "Instagram":
        return "instagram";
      case "VK":
        return "vk";
      default:
        return "Globe";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Управление кампаниями
          </h2>
          <p className="text-gray-600">
            Создание и управление рекламными кампаниями
          </p>
        </div>
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <Button onClick={() => setShowCreateForm(true)}>
            <Icon name="Plus" size={16} className="mr-2" />
            Создать кампанию
          </Button>

          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Новая кампания</DialogTitle>
              <DialogDescription>
                Заполните данные для создания рекламной кампании
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Основные данные */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Основные данные</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Название кампании *</Label>
                    <Input
                      id="name"
                      value={newCampaign.name}
                      onChange={(e) =>
                        setNewCampaign({ ...newCampaign, name: e.target.value })
                      }
                      placeholder="Введите название"
                    />
                  </div>
                  <div>
                    <Label htmlFor="audience">Целевая аудитория</Label>
                    <Input
                      id="audience"
                      value={newCampaign.audience}
                      onChange={(e) =>
                        setNewCampaign({
                          ...newCampaign,
                          audience: e.target.value,
                        })
                      }
                      placeholder="Женщины 25-35"
                    />
                  </div>
                  <div>
                    <Label htmlFor="platform">Платформа *</Label>
                    <Select
                      value={newCampaign.platform}
                      onValueChange={(value) =>
                        setNewCampaign({ ...newCampaign, platform: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите платформу" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="VK">VK</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="objective">Цель кампании *</Label>
                    <Select
                      value={newCampaign.objective}
                      onValueChange={(value) =>
                        setNewCampaign({ ...newCampaign, objective: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите цель" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Конверсии">Конверсии</SelectItem>
                        <SelectItem value="Охват">Охват</SelectItem>
                        <SelectItem value="Трафик">Трафик</SelectItem>
                        <SelectItem value="Узнаваемость">
                          Узнаваемость
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Период и бюджет */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Период и бюджет</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Дата начала</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newCampaign.startDate}
                      onChange={(e) => {
                        setNewCampaign({
                          ...newCampaign,
                          startDate: e.target.value,
                        });
                        setTimeout(calculateBudget, 100);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">Дата окончания</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newCampaign.endDate}
                      onChange={(e) => {
                        setNewCampaign({
                          ...newCampaign,
                          endDate: e.target.value,
                        });
                        setTimeout(calculateBudget, 100);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dailyBudget">Дневной бюджет (₽)</Label>
                    <Input
                      id="dailyBudget"
                      type="number"
                      value={newCampaign.dailyBudget}
                      onChange={(e) => {
                        setNewCampaign({
                          ...newCampaign,
                          dailyBudget: e.target.value,
                        });
                        setTimeout(calculateBudget, 100);
                      }}
                      placeholder="1000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget">Общий бюджет (₽) *</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={newCampaign.budget}
                      onChange={(e) =>
                        setNewCampaign({
                          ...newCampaign,
                          budget: e.target.value,
                        })
                      }
                      placeholder="25000"
                    />
                  </div>
                </div>
              </div>

              {/* Расчет бюджета */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">
                  Автоматический расчет
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="targetCPA">
                      Целевая цена конверсии (₽)
                    </Label>
                    <Input
                      id="targetCPA"
                      type="number"
                      value={newCampaign.targetCPA}
                      onChange={(e) => {
                        setNewCampaign({
                          ...newCampaign,
                          targetCPA: e.target.value,
                        });
                        setTimeout(calculateBudget, 100);
                      }}
                      placeholder="500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expectedReach">Ожидаемые конверсии</Label>
                    <Input
                      id="expectedReach"
                      type="number"
                      value={newCampaign.expectedReach}
                      onChange={(e) => {
                        setNewCampaign({
                          ...newCampaign,
                          expectedReach: e.target.value,
                        });
                        setTimeout(calculateBudget, 100);
                      }}
                      placeholder="50"
                    />
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 Бюджет рассчитывается автоматически на основе дневного
                    бюджета и периода кампании, или на основе целевой цены
                    конверсии и ожидаемого количества конверсий.
                  </p>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button onClick={handleCreateCampaign}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать кампанию
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Отмена
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Список кампаний */}
      <div className="grid gap-4">
        {campaigns.map((campaign) => (
          <Card
            key={campaign.id}
            className="bg-white shadow-lg hover:shadow-xl transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {campaign.name}
                    </h3>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                    <Icon
                      name={getPlatformIcon(campaign.platform)}
                      size={16}
                      className="text-blue-600"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {campaign.audience}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Бюджет:</span>
                      <p className="font-medium">
                        ₽{campaign.budget.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Потрачено:</span>
                      <p className="font-medium">
                        ₽{campaign.spent.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Цель:</span>
                      <p className="font-medium">{campaign.objective}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Период:</span>
                      <p className="font-medium">
                        {campaign.startDate} - {campaign.endDate}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 ml-4">
                  <Button
                    size="sm"
                    variant={
                      campaign.status === "Активна" ? "secondary" : "default"
                    }
                    onClick={() => toggleCampaignStatus(campaign.id)}
                  >
                    <Icon
                      name={campaign.status === "Активна" ? "Pause" : "Play"}
                      size={14}
                      className="mr-1"
                    />
                    {campaign.status === "Активна" ? "Пауза" : "Запуск"}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Icon name="Settings" size={14} className="mr-1" />
                    Настроить
                  </Button>
                </div>
              </div>

              {/* Прогресс бар */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {((campaign.spent / campaign.budget) * 100).toFixed(1)}% от
                бюджета
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Экспортируем функцию для внешнего использования
export const useCampaignManager = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const openModal = () => setShowCreateForm(true);
  const closeModal = () => setShowCreateForm(false);

  return { showCreateForm, openModal, closeModal };
};

export default CampaignManager;
