import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { CreditCard, Download, FileText, ShieldCheck, Wallet, AlertCircle, CheckCircle2, Building, User, MapPin, Globe, Smartphone } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export function BillingManagement() {
  const [isYearly, setIsYearly] = useState(false);
  const navigate = useNavigate();
  
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "Visa", last4: "4242", expiry: "12/28", isDefault: true },
    { id: 2, type: "Mastercard", last4: "8899", expiry: "09/26", isDefault: false },
  ]);

  const removePaymentMethod = (id: number) => {
    setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
    toast.success("Payment method removed successfully");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
          <p className="text-muted-foreground">Manage your subscription, payment methods, and billing details.</p>
        </div>
      </div>

      <Tabs defaultValue="subscription" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="billing">Billing Info</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        {/* Subscription Management */}
        <TabsContent value="subscription" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>You are currently on the <span className="font-semibold text-primary">Creators Plan</span>.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 border rounded-lg bg-muted/20">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-xl">Creators Plan</h3>
                    <Badge className="bg-green-500/15 text-green-600 hover:bg-green-500/25 border-green-500/20">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">$29.00 / month • Renews on Nov 24, 2025</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline">Cancel Subscription</Button>
                  <Button onClick={() => navigate("/dashboard/pricing")}>Change Plan</Button>
                </div>
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <div className="flex flex-row items-center justify-between p-6">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Credits Remaining</h3>
                    <div className="text-2xl font-bold">34 / 50</div>
                  </div>
                  <p className="text-sm text-muted-foreground">Resets in 12 days</p>
                </div>
              </Card>
            </CardContent>
          </Card>

          {/* Checkout / Upgrade Preview */}
          <Card className="border-primary/20 shadow-lg shadow-primary/5 overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-secondary/10 p-1 h-1" />
            <CardHeader>
              <CardTitle>Upgrade to Enterprise</CardTitle>
              <CardDescription>Get more power for your team.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
                    <div>
                      <p className="font-medium">Enterprise Plan</p>
                      <p className="text-sm text-muted-foreground">Billed Monthly</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl">$99.00</p>
                      <p className="text-xs text-muted-foreground">+ Tax</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Promo Code</Label>
                    <div className="flex gap-2">
                      <Input placeholder="Enter code" />
                      <Button variant="outline">Apply</Button>
                    </div>
                  </div>
                  <div className="pt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Subtotal</span>
                      <span>$99.00</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Tax (10%)</span>
                      <span>$9.90</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>$108.90</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label>Payment Method</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 border-primary bg-primary/5">
                        <CreditCard className="h-6 w-6" />
                        <span className="text-xs">Card</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                        <Smartphone className="h-6 w-6" />
                        <span className="text-xs">UPI</span>
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg">
                    Pay Now $108.90
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3 w-3" />
                    Secure SSL Encryption
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Methods */}
        <TabsContent value="payment" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your saved payment methods.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg animate-in fade-in slide-in-from-left-2">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-14 bg-muted rounded flex items-center justify-center border">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">{method.type} ending in {method.last4}</p>
                      <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                    </div>
                  </div>
                  {method.isDefault ? (
                    <Badge variant="secondary">Default</Badge>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => removePaymentMethod(method.id)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              
              {paymentMethods.length === 0 && (
                <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                  No payment methods saved.
                </div>
              )}
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full border-dashed">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Add New Payment Method
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Payment Method</DialogTitle>
                    <DialogDescription>
                      Add a new credit card or UPI ID to your account.
                    </DialogDescription>
                  </DialogHeader>
                  <Tabs defaultValue="card" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="card">Card</TabsTrigger>
                      <TabsTrigger value="upi">UPI</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Cardholder Name</Label>
                        <Input id="name" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="number">Card Number</Label>
                        <Input id="number" placeholder="0000 0000 0000 0000" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                      <Button className="w-full" onClick={() => toast.success("Card added successfully")}>Save Card</Button>
                    </TabsContent>
                    <TabsContent value="upi" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="upi-id">UPI ID</Label>
                        <Input id="upi-id" placeholder="username@bank" />
                      </div>
                      <Button className="w-full" onClick={() => toast.success("UPI ID added successfully")}>Verify & Save UPI</Button>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Information */}
        <TabsContent value="billing" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Update your billing details and address.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" defaultValue="Alex Creator" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" defaultValue="alex@vidgen.ai" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" defaultValue="123 Creator St" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input defaultValue="San Francisco" />
                </div>
                <div className="space-y-2">
                  <Label>State / Province</Label>
                  <Input defaultValue="CA" />
                </div>
                <div className="space-y-2">
                  <Label>Postal Code</Label>
                  <Input defaultValue="94105" />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Select defaultValue="us">
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tax ID / VAT Number</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" placeholder="Optional" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t p-6">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Invoices */}
        <TabsContent value="invoices" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
              <CardDescription>View and download your past invoices.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: "INV-2024-001", date: "Oct 24, 2024", amount: "$29.00", status: "Paid" },
                    { id: "INV-2024-002", date: "Sep 24, 2024", amount: "$29.00", status: "Paid" },
                    { id: "INV-2024-003", date: "Aug 24, 2024", amount: "$29.00", status: "Paid" },
                    { id: "INV-2024-004", date: "Jul 24, 2024", amount: "$9.00", status: "Paid" },
                  ].map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          PDF
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}