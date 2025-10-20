# LiveKit Setup Instructions

## 💡 Important: You DON'T Need Your Own Server!

**LiveKit Cloud is FREE and fully hosted** - you're just connecting to their cloud service, not hosting anything yourself!

## 🚀 Quick Setup (2 Minutes, FREE Forever)

### 1. Sign Up for FREE LiveKit Cloud

1. Go to [https://cloud.livekit.io/](https://cloud.livekit.io/)
2. Click "Sign Up" (100% FREE - no credit card needed!)
3. Create a new project (takes 10 seconds)

### 2. Copy Your FREE Cloud Credentials

In your LiveKit Cloud dashboard:
- Copy your **API Key** (starts with `API...`)
- Copy your **API Secret** (long string)
- Copy your **WebSocket URL** (looks like `wss://your-project.livekit.cloud`)

### 3. Create Environment Variables

Create a `.env.local` file in the root directory:

```bash
# LiveKit Cloud Credentials (FREE tier)
LIVEKIT_API_KEY=APIxxxxxxxxxxxxx
LIVEKIT_API_SECRET=your-secret-here
LIVEKIT_WS_URL=wss://your-project.livekit.cloud
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you'll see:
- **Language detection** in the top-right corner
- **Automatic token generation** and LiveKit connection
- **ChatGPT-style loading animation** while connecting

## 💰 What's Included in FREE Tier?

LiveKit Cloud FREE tier includes:
- ✅ **Unlimited rooms**
- ✅ **Up to 50 concurrent participants**
- ✅ **HD video/audio**
- ✅ **No credit card required**
- ✅ **No time limit**
- ✅ **Perfect for development & small projects**

## 🎯 How It Works

1. **You sign up** → Get FREE LiveKit Cloud account (they host everything!)
2. **Get credentials** → Copy API keys from their dashboard
3. **Your app connects** → Uses their cloud servers (wss://your-project.livekit.cloud)
4. **Zero hosting needed** → Everything runs on LiveKit's infrastructure

You're NOT hosting anything - just connecting to their FREE cloud service!

## 🛠️ Customization

### Change Room Name

Edit `src/app/page.tsx`:

```typescript
<LiveKitConnector 
  roomName="your-custom-room"
  participantName="John Doe"  // Optional: set a specific name
/>
```

### Add Room Features

Edit `src/components/LiveKitConnector.tsx` to add video/audio controls, participant lists, etc.

## 📚 Resources

- [LiveKit Documentation](https://docs.livekit.io/)
- [LiveKit React Components](https://docs.livekit.io/reference/components/react/)
- [LiveKit Playground](https://meet.livekit.io/)

## 🐛 Troubleshooting

**Error: "LiveKit credentials not configured"**
- Make sure your `.env.local` file exists and has all three variables
- Restart your dev server after creating/modifying `.env.local`

**Error: "Failed to generate token"**
- Check that your API Key and Secret are correct
- Verify your WebSocket URL format

**Connection timeout**
- Check your internet connection
- Verify the WebSocket URL is accessible

