"use client";

import { Navbar } from "@/components/custom/navbar";
import { DollarSign, TrendingUp, Users, Eye, Calendar, Download, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useState } from "react";

const mockEarnings = {
  total: 12450.50,
  thisMonth: 3250.00,
  lastMonth: 2890.00,
  subscribers: 245,
  views: 125340,
  growth: 12.5,
};

const mockTransactions = [
  {
    id: "1",
    type: "subscription",
    user: "Ana Silva",
    amount: 29.90,
    date: "2024-03-15",
    status: "completed",
  },
  {
    id: "2",
    type: "subscription",
    user: "Carlos Santos",
    amount: 29.90,
    date: "2024-03-14",
    status: "completed",
  },
  {
    id: "3",
    type: "tip",
    user: "Maria Costa",
    amount: 50.00,
    date: "2024-03-13",
    status: "completed",
  },
  {
    id: "4",
    type: "subscription",
    user: "João Oliveira",
    amount: 29.90,
    date: "2024-03-12",
    status: "completed",
  },
  {
    id: "5",
    type: "subscription",
    user: "Beatriz Lima",
    amount: 29.90,
    date: "2024-03-11",
    status: "pending",
  },
  {
    id: "6",
    type: "tip",
    user: "Pedro Alves",
    amount: 100.00,
    date: "2024-03-10",
    status: "completed",
  },
];

const mockMonthlyData = [
  { month: "Jan", earnings: 2100 },
  { month: "Fev", earnings: 2890 },
  { month: "Mar", earnings: 3250 },
];

export default function FinanceiroPage() {
  const [period, setPeriod] = useState<"week" | "month" | "year">("month");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  };

  const growthPercentage = ((mockEarnings.thisMonth - mockEarnings.lastMonth) / mockEarnings.lastMonth * 100).toFixed(1);
  const isPositiveGrowth = mockEarnings.thisMonth > mockEarnings.lastMonth;

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pb-24 md:pb-8">
      <Navbar />

      <div className="pt-24 px-4 md:px-6 container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FF0040]/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#FF0040]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Dashboard Financeiro</h1>
                <p className="text-white/60">Acompanhe seus ganhos e estatísticas</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-[#FF0040] rounded-xl font-semibold hover:bg-[#FF0040]/90 transition-all duration-300 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Exportar Relatório
            </button>
          </div>

          {/* Period Filter */}
          <div className="flex gap-3">
            <button
              onClick={() => setPeriod("week")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                period === "week"
                  ? "bg-[#FF0040] text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setPeriod("month")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                period === "month"
                  ? "bg-[#FF0040] text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              Mês
            </button>
            <button
              onClick={() => setPeriod("year")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                period === "year"
                  ? "bg-[#FF0040] text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              Ano
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Earnings */}
          <div className="rounded-2xl bg-gradient-to-br from-[#FF0040]/20 to-[#FF0040]/5 border border-[#FF0040]/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#FF0040]/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#FF0040]" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-semibold ${isPositiveGrowth ? "text-green-500" : "text-red-500"}`}>
                {isPositiveGrowth ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {growthPercentage}%
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{formatCurrency(mockEarnings.thisMonth)}</h3>
            <p className="text-white/60 text-sm">Ganhos este mês</p>
          </div>

          {/* Subscribers */}
          <div className="rounded-2xl bg-[#1A1A1A] border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                <Users className="w-6 h-6 text-white/80" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{mockEarnings.subscribers}</h3>
            <p className="text-white/60 text-sm">Assinantes ativos</p>
          </div>

          {/* Views */}
          <div className="rounded-2xl bg-[#1A1A1A] border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                <Eye className="w-6 h-6 text-white/80" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{mockEarnings.views.toLocaleString("pt-BR")}</h3>
            <p className="text-white/60 text-sm">Visualizações totais</p>
          </div>

          {/* Total All Time */}
          <div className="rounded-2xl bg-[#1A1A1A] border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white/80" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{formatCurrency(mockEarnings.total)}</h3>
            <p className="text-white/60 text-sm">Total acumulado</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transactions List */}
          <div className="lg:col-span-2 rounded-2xl bg-[#1A1A1A] border border-white/10 p-6">
            <h2 className="text-2xl font-bold mb-6">Transações Recentes</h2>
            <div className="space-y-3">
              {mockTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF0040]/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === "subscription" ? "bg-[#FF0040]/20" : "bg-green-500/20"
                      }`}>
                        {transaction.type === "subscription" ? (
                          <Users className={`w-5 h-5 ${transaction.type === "subscription" ? "text-[#FF0040]" : "text-green-500"}`} />
                        ) : (
                          <DollarSign className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{transaction.user}</h3>
                        <p className="text-sm text-white/60">
                          {transaction.type === "subscription" ? "Assinatura" : "Gorjeta"} • {formatDate(transaction.date)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{formatCurrency(transaction.amount)}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        transaction.status === "completed"
                          ? "bg-green-500/20 text-green-500"
                          : "bg-yellow-500/20 text-yellow-500"
                      }`}>
                        {transaction.status === "completed" ? "Concluído" : "Pendente"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Chart */}
          <div className="rounded-2xl bg-[#1A1A1A] border border-white/10 p-6">
            <h2 className="text-2xl font-bold mb-6">Evolução Mensal</h2>
            <div className="space-y-4">
              {mockMonthlyData.map((data, index) => {
                const maxEarnings = Math.max(...mockMonthlyData.map(d => d.earnings));
                const percentage = (data.earnings / maxEarnings) * 100;
                
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-white/80">{data.month}</span>
                      <span className="text-sm font-bold">{formatCurrency(data.earnings)}</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF0040] to-[#FF4060] rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Payout Info */}
            <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-[#FF0040]" />
                <h3 className="font-semibold">Próximo Pagamento</h3>
              </div>
              <p className="text-2xl font-bold mb-1">{formatCurrency(mockEarnings.thisMonth)}</p>
              <p className="text-sm text-white/60">Disponível em 5 dias</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
