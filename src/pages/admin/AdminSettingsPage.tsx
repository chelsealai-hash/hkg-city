import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  Save,
  Globe,
  Palette,
  Bell,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/stores/firebaseStore';

export function AdminSettingsPage() {
  const { t } = useTranslation();
  console.log(t('admin.settings')); // Use t to avoid unused warning
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const [settings, setSettings] = useState({
    siteName: 'HKG.CITY',
    siteDescription: 'Your trusted portal for Hong Kong information',
    contactEmail: 'info@hkg.city',
    enableRegistration: false,
    enableComments: false,
    maintenanceMode: false,
    analyticsEnabled: true,
    defaultLanguage: 'en',
    itemsPerPage: 20,
  });

  // Protect route
  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const handleSave = () => {
    // In a real app, this would save to backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#003366] text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard" className="text-xl font-bold">
                HKG<span className="text-[#0066CC]">.</span>CITY
              </Link>
              <span className="text-white/40">|</span>
              <span className="text-white/80">Settings</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/admin/dashboard')}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div>
                    <Label>Site Name</Label>
                    <Input 
                      value={settings.siteName}
                      onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Site Description</Label>
                    <Input 
                      value={settings.siteDescription}
                      onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Contact Email</Label>
                    <Input 
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Default Language</Label>
                    <select 
                      className="w-full px-3 py-2 border rounded-lg"
                      value={settings.defaultLanguage}
                      onChange={(e) => setSettings({...settings, defaultLanguage: e.target.value})}
                    >
                      <option value="en">English</option>
                      <option value="zh-HK">繁體中文</option>
                      <option value="zh-CN">简体中文</option>
                      <option value="ja">日本語</option>
                      <option value="ko">한국어</option>
                    </select>
                  </div>
                  <div>
                    <Label>Items Per Page</Label>
                    <Input 
                      type="number"
                      value={settings.itemsPerPage}
                      onChange={(e) => setSettings({...settings, itemsPerPage: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <div className="font-medium">Dark Mode</div>
                    <div className="text-sm text-gray-500">Enable dark mode for admin panel</div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <div className="font-medium">Compact View</div>
                    <div className="text-sm text-gray-500">Show more items per page</div>
                  </div>
                  <Switch />
                </div>
                <div>
                  <Label>Primary Color</Label>
                  <div className="flex gap-2 mt-2">
                    {['#003366', '#0066CC', '#CC0000', '#10B981', '#F59E0B'].map(color => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-full border-2 border-white shadow"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-gray-500">Receive email alerts for new listings</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <div className="font-medium">Traffic Alerts</div>
                    <div className="text-sm text-gray-500">Get notified of unusual traffic spikes</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <div className="font-medium">Weekly Reports</div>
                    <div className="text-sm text-gray-500">Receive weekly analytics reports</div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-gray-500">Require 2FA for admin login</div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <div className="font-medium">Login Notifications</div>
                    <div className="text-sm text-gray-500">Get notified of new login attempts</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label>Session Timeout (minutes)</Label>
                  <Input type="number" defaultValue={30} />
                </div>
                <div>
                  <Label>Max Login Attempts</Label>
                  <Input type="number" defaultValue={5} />
                </div>
                <Button variant="outline" className="w-full">
                  <Shield className="w-4 h-4 mr-2" />
                  Change Admin Password
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <Button onClick={handleSave} className="bg-[#003366]">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
