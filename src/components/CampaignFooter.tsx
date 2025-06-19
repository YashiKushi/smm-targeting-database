import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CampaignManager from "./CampaignManager";
import { useState } from "react";

const CampaignFooter = () => {
  const [showCampaignModal, setShowCampaignModal] = useState(false);

  return (
    <>
      <footer className="mt-12 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-gray-900">
                SMM Центр Управления
              </h3>
              <p className="text-sm text-gray-600">
                Управление рекламными кампаниями
              </p>
            </div>

            <Button
              onClick={() => setShowCampaignModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3"
            >
              <Icon name="Plus" size={18} className="mr-2" />
              Создать кампанию
            </Button>
          </div>
        </div>
      </footer>

      <Dialog open={showCampaignModal} onOpenChange={setShowCampaignModal}>
        <CampaignManager />
      </Dialog>
    </>
  );
};

export default CampaignFooter;
