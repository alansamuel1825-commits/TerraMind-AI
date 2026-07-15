
# TerraMind AI | Global Sustainability Intelligence

TerraMind AI is a premium, high-fidelity sustainability dashboard and predictive intelligence platform designed for urban planners, environmental scientists, and executive decision-makers. It serves as a unified command center for planetary resilience.

## 🚀 Vision
To provide a unified intelligence layer that correlates agricultural health, energy efficiency, circular waste management, and climate telemetry into a single, actionable interface.

## 🛠 Tech Stack
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **AI Engine**: [Genkit](https://firebase.google.com/docs/genkit) powered by Gemini 2.5 Flash
- **Backend**: [Firebase](https://firebase.google.com/) (Auth, Firestore, Storage)
- **Styling**: Tailwind CSS + [ShadCN UI](https://ui.shadcn.com/)
- **Charts**: Recharts (Enterprise-grade visualization)
- **Voice**: Neural TTS (Gemini Flash Voice)

## 📦 Key Intelligence Modules
1. **Executive Command Center**: Unified sustainability scoring (Index: 84.2) and global risk telemetry.
2. **Agriculture Intelligence**: AI-powered crop pathology detection with pattern-matching confidence gauges.
3. **Climate Digital Twin**: Real-time 2D city simulation with dynamic policy sliders and climate stress testing.
4. **Circular Economy**: Multi-modal material classification and upcycling path generation.
5. **Smart Grid Analytics**: Renewable energy load balancing and building-level efficiency forecasting.
6. **Public Health**: Environmental indicator tracking (AQI, Purity) and heat-stress awareness.

## 🤖 Neural Assistant
The TerraMind Assistant is a context-aware AI agent that can:
- Answer complex sustainability queries.
- Reference your specific simulation data using autonomous tool calls.
- Accept multimodal inputs (images).
- Provide neural voice responses.

## 🚦 Getting Started

### Prerequisites
- Node.js 20+
- A Firebase Project

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd terramind-ai
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file with your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   GOOGLE_GENAI_API_KEY=your_gemini_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 📄 License
This project is licensed for educational and demonstration purposes as part of the TerraMind Resilience Protocol.
