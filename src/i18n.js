import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "app": {
        "title": "Zorvyn",
        "dashboard": "Dashboard",
        "analytics": "Analytics",
        "transactions": "Transactions",
        "settings": "Settings",
        "total": "Total",
        "noTrendData": "No trend data available yet.",
        "balanceTrend": "Balance Trend",
        "noExpenseData": "No expense categories to display.",
        "spendingBreakdown": "Spending Breakdown",
        "transactionsHistory": "Transactions History",
        "recordsFound": "records found"
      },
      "header": {
        "status": "Live Workspace Status: Active",
        "eyebrow": "Master Your Wealth",
        "title": "Financial Command Center",
        "subtitle": "A next-generation dashboard to effortlessly track your money flow, decode spending behavior, and discover game-changing insights."
      },
      "summary": {
        "balance": "Current Balance",
        "income": "Total Income",
        "expenses": "Total Expenses"
      },
      "role": {
        "viewer": "Viewer",
        "admin": "Admin"
      },
      "transactions": {
        "title": "Recent Transactions",
        "search": "Search by note or category",
        "add_new": "Add Transaction",
        "date": "Date",
        "type": "Type",
        "category": "Category",
        "amount": "Amount",
        "note": "Description",
        "action": "Action"
      },
      "controls": {
        "allTypes": "All types",
        "income": "Income",
        "expense": "Expense",
        "allCategories": "All categories",
        "newestFirst": "Newest first",
        "oldestFirst": "Oldest first",
        "highestAmount": "Highest amount",
        "lowestAmount": "Lowest amount",
        "noGrouping": "No grouping",
        "groupByCategory": "Group by category",
        "groupByMonth": "Group by month",
        "minAmount": "Min amount",
        "maxAmount": "Max amount",
        "resetFilters": "Reset Filters"
      },
      "export": {
        "csv": "Export CSV",
        "json": "Export JSON",
        "noRows": "No rows available to export",
        "csvTitle": "Export filtered rows as CSV",
        "jsonTitle": "Export filtered rows as JSON"
      },
      "form": {
        "edit": "Edit Transaction",
        "addNew": "Add New Transaction",
        "save": "Save Changes",
        "cancel": "Cancel",
        "amountPlaceholder": "Amount ($)",
        "notePlaceholder": "Enter a description or note..."
      },
      "table": {
        "noFoundTitle": "No transactions found",
        "noFoundDesc": "Try changing filters, search term, or add a transaction as Admin.",
        "showing": "Showing",
        "to": "to",
        "of": "of",
        "results": "results"
      },
      "insights": {
        "title": "Insights & Intelligence",
        "highestSpending": "Highest spending focus:",
        "monthlyEval": "Monthly evaluation:",
        "aiObs": "AI observation:",
        "noData": "No expense data yet"
      },
      "grouped": {
        "by": "Grouped by",
        "transactions": "Transactions:",
        "income": "Income:",
        "expense": "Expense:",
        "net": "Net:"
      },
      "footer": {
        "settingsInsights": "Settings & Insights",
        "copyright": "Zorvyn Financial. Crafted with precision."
      }
    }
  },
  es: {
    translation: {
      "app": {
        "title": "Zorvyn",
        "dashboard": "Tablero",
        "analytics": "Análisis",
        "transactions": "Transacciones",
        "settings": "Ajustes",
        "total": "Total",
        "noTrendData": "Aún no hay datos de tendencia.",
        "balanceTrend": "Tendencia de saldo",
        "noExpenseData": "No hay categorías de gastos para mostrar.",
        "spendingBreakdown": "Desglose de gastos",
        "transactionsHistory": "Historial de transacciones",
        "recordsFound": "registros encontrados"
      },
      "header": {
        "status": "Estado del espacio de trabajo: Activo",
        "eyebrow": "Domina tu riqueza",
        "title": "Centro de Comando Financiero",
        "subtitle": "Un tablero de próxima generación para rastrear tu flujo de dinero, descodificar el comportamiento de gasto y descubrir perspectivas transformadoras."
      },
      "summary": {
        "balance": "Saldo Actual",
        "income": "Ingresos Totales",
        "expenses": "Gastos Totales"
      },
      "role": {
        "viewer": "Espectador",
        "admin": "Administrador"
      },
      "transactions": {
        "title": "Transacciones Recientes",
        "search": "Buscar por nota o categoría",
        "add_new": "Añadir Transacción",
        "date": "Fecha",
        "type": "Tipo",
        "category": "Categoría",
        "amount": "Monto",
        "note": "Descripción",
        "action": "Acción"
      },
      "controls": {
        "allTypes": "Todos los tipos",
        "income": "Ingreso",
        "expense": "Gasto",
        "allCategories": "Todas las categorías",
        "newestFirst": "Más recientes primero",
        "oldestFirst": "Más antiguos primero",
        "highestAmount": "Monto más alto",
        "lowestAmount": "Monto más bajo",
        "noGrouping": "Sin agrupar",
        "groupByCategory": "Agrupar por categoría",
        "groupByMonth": "Agrupar por mes",
        "minAmount": "Monto mín",
        "maxAmount": "Monto máx",
        "resetFilters": "Restablecer Filtros"
      },
      "export": {
        "csv": "Exportar CSV",
        "json": "Exportar JSON",
        "noRows": "No hay filas para exportar",
        "csvTitle": "Exportar filas filtradas a CSV",
        "jsonTitle": "Exportar filas filtradas a JSON"
      },
      "form": {
        "edit": "Editar Transacción",
        "addNew": "Añadir Nueva Transacción",
        "save": "Guardar Cambios",
        "cancel": "Cancelar",
        "amountPlaceholder": "Monto",
        "notePlaceholder": "Ingrese una descripción o nota..."
      },
      "table": {
        "noFoundTitle": "No se encontraron transacciones",
        "noFoundDesc": "Intente cambiar los filtros, busque un término o agregue una transacción como administrador.",
        "showing": "Mostrando",
        "to": "a",
        "of": "de",
        "results": "resultados"
      },
      "insights": {
        "title": "Perspectivas e Inteligencia",
        "highestSpending": "Mayor enfoque de gastos:",
        "monthlyEval": "Evaluación mensual:",
        "aiObs": "Observación de IA:",
        "noData": "Sin datos de gastos aún"
      },
      "grouped": {
        "by": "Agrupado por",
        "transactions": "Transacciones:",
        "income": "Ingresos:",
        "expense": "Gastos:",
        "net": "Neto:"
      },
      "footer": {
        "settingsInsights": "Ajustes y Perspectivas",
        "copyright": "Zorvyn Financial. Elaborado con precisión."
      }
    }
  },
  fr: {
    translation: {
      "app": {
        "title": "Zorvyn",
        "dashboard": "Tableau",
        "analytics": "Analytique",
        "transactions": "Transactions",
        "settings": "Paramètres",
        "total": "Total",
        "noTrendData": "Aucune donnée de tendance pour le moment.",
        "balanceTrend": "Tendance du solde",
        "noExpenseData": "Aucune catégorie de dépenses à afficher.",
        "spendingBreakdown": "Répartition des dépenses",
        "transactionsHistory": "Historique des transactions",
        "recordsFound": "enregistrements trouvés"
      },
      "header": {
        "status": "Statut de l'espace: Actif",
        "eyebrow": "Maîtrisez votre richesse",
        "title": "Centre de Commande Financier",
        "subtitle": "Un tableau de bord de nouvelle génération pour suivre votre flux d'argent, décoder le comportement de dépense et découvrir des informations révolutionnaires."
      },
      "summary": {
        "balance": "Solde Actuel",
        "income": "Revenu Total",
        "expenses": "Dépenses Totales"
      },
      "role": {
        "viewer": "Spectateur",
        "admin": "Administrateur"
      },
      "transactions": {
        "title": "Transactions Récentes",
        "search": "Recherche par note ou catégorie",
        "add_new": "Ajouter Transaction",
        "date": "Date",
        "type": "Type",
        "category": "Catégorie",
        "amount": "Montant",
        "note": "Description",
        "action": "Action"
      },
      "controls": {
        "allTypes": "Tous types",
        "income": "Revenu",
        "expense": "Dépense",
        "allCategories": "Toutes catégories",
        "newestFirst": "Récents d'abord",
        "oldestFirst": "Anciens d'abord",
        "highestAmount": "Montant le plus élevé",
        "lowestAmount": "Montant le plus bas",
        "noGrouping": "Aucun regroupement",
        "groupByCategory": "Grouper par catégorie",
        "groupByMonth": "Grouper par mois",
        "minAmount": "Montant min",
        "maxAmount": "Montant max",
        "resetFilters": "Réinitialiser Filtres"
      },
      "export": {
        "csv": "Exporter CSV",
        "json": "Exporter JSON",
        "noRows": "Aucune ligne à exporter",
        "csvTitle": "Exporter les lignes filtrées au format CSV",
        "jsonTitle": "Exporter les lignes filtrées au format JSON"
      },
      "form": {
        "edit": "Modifier la Transaction",
        "addNew": "Ajouter Nouvelle Transaction",
        "save": "Enregistrer les Modifications",
        "cancel": "Annuler",
        "amountPlaceholder": "Montant",
        "notePlaceholder": "Entrez une description ou une note..."
      },
      "table": {
        "noFoundTitle": "Aucune transaction trouvée",
        "noFoundDesc": "Essayez de modifier les filtres, le terme de recherche ou ajoutez une transaction en tant qu'Administrateur.",
        "showing": "Affichage",
        "to": "à",
        "of": "de",
        "results": "résultats"
      },
      "insights": {
        "title": "Analyses et Intelligence",
        "highestSpending": "Focus principal des dépenses:",
        "monthlyEval": "Évaluation mensuelle:",
        "aiObs": "Observation IA:",
        "noData": "Aucune donnée de dépense"
      },
      "grouped": {
        "by": "Groupé par",
        "transactions": "Transactions:",
        "income": "Revenus:",
        "expense": "Dépenses:",
        "net": "Net:"
      },
      "footer": {
        "settingsInsights": "Paramètres et Analyses",
        "copyright": "Zorvyn Financial. Fabriqué avec précision."
      }
    }
  },
  hi: {
    translation: {
      "app": {
        "title": "ज़ोरविन",
        "dashboard": "डैशबोर्ड",
        "analytics": "एनालिटिक्स",
        "transactions": "लेनदेन",
        "settings": "सेटिंग्स",
        "total": "कुल",
        "noTrendData": "अभी तक कोई रुझान डेटा उपलब्ध नहीं है।",
        "balanceTrend": "बैलेंस रुझान",
        "noExpenseData": "दिखाने के लिए कोई व्यय श्रेणी नहीं है।",
        "spendingBreakdown": "व्यय का विवरण",
        "transactionsHistory": "लेनदेन का इतिहास",
        "recordsFound": "रिकॉर्ड मिले"
      },
      "header": {
        "status": "लाइव वर्कस्पेस स्थिति: सक्रिय",
        "eyebrow": "अपनी संपत्ति पर महारत हासिल करें",
        "title": "वित्तीय कमांड सेंटर",
        "subtitle": "अपने धन प्रवाह को सहजता से ट्रैक करने, खर्च करने के व्यवहार को डिकोड करने और गेम-चेंजिंग इनसाइट्स खोजने के लिए एक अगली पीढ़ी का डैशबोर्ड।"
      },
      "summary": {
        "balance": "वर्तमान शेष",
        "income": "कुल आय",
        "expenses": "कुल व्यय"
      },
      "role": {
        "viewer": "दर्शक",
        "admin": "प्रशासक"
      },
      "transactions": {
        "title": "हाल के लेनदेन",
        "search": "नोट या श्रेणी द्वारा खोजें",
        "add_new": "लेनदेन जोड़ें",
        "date": "तारीख़",
        "type": "प्रकार",
        "category": "श्रेणी",
        "amount": "रकम",
        "note": "विवरण",
        "action": "कार्रवाई"
      },
      "controls": {
        "allTypes": "सभी प्रकार",
        "income": "आय",
        "expense": "व्यय",
        "allCategories": "सभी श्रेणियां",
        "newestFirst": "सबसे नया पहले",
        "oldestFirst": "सबसे पुराना पहले",
        "highestAmount": "उच्चतम राशि",
        "lowestAmount": "न्यूनतम राशि",
        "noGrouping": "कोई समूहीकरण नहीं",
        "groupByCategory": "श्रेणी के अनुसार",
        "groupByMonth": "महीने के अनुसार",
        "minAmount": "न्यूनतम राशि",
        "maxAmount": "अधिकतम राशि",
        "resetFilters": "फ़िल्टर रीसेट करें"
      },
      "export": {
        "csv": "CSV निर्यात करें",
        "json": "JSON निर्यात करें",
        "noRows": "निर्यात करने के लिए कोई पंक्ति नहीं",
        "csvTitle": "फ़िल्टर की गई पंक्तियों को CSV के रूप में निर्यात करें",
        "jsonTitle": "फ़िल्टर की गई पंक्तियों को JSON के रूप में निर्यात करें"
      },
      "form": {
        "edit": "लेनदेन संपादित करें",
        "addNew": "नया लेनदेन जोड़ें",
        "save": "परिवर्तन सहेजें",
        "cancel": "रद्द करें",
        "amountPlaceholder": "राशि",
        "notePlaceholder": "एक विवरण या नोट दर्ज करें..."
      },
      "table": {
        "noFoundTitle": "कोई लेनदेन नहीं मिला",
        "noFoundDesc": "फ़िल्टर, खोज शब्द बदलने का प्रयास करें, या व्यवस्थापक के रूप में लेनदेन जोड़ें।",
        "showing": "दिखा रहा है",
        "to": "से",
        "of": "में से",
        "results": "परिणाम"
      },
      "insights": {
        "title": "इनसाइट्स और इंटेलिजेंस",
        "highestSpending": "उच्चतम खर्च केंद्र:",
        "monthlyEval": "मासिक मूल्यांकन:",
        "aiObs": "एआई अवलोकन:",
        "noData": "अभी तक व्यय डेटा नहीं"
      },
      "grouped": {
        "by": "द्वारा समूहीकृत",
        "transactions": "लेनदेन:",
        "income": "आय:",
        "expense": "व्यय:",
        "net": "शुद्ध:"
      },
      "footer": {
        "settingsInsights": "सेटिंग्स और इनसाइट्स",
        "copyright": "ज़ोरविन फाइनेंशियल। सटीकता के साथ तैयार किया गया।"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;