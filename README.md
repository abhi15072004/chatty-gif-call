
# ABHI - Messaging App

ABHI is a modern messaging application that supports text messaging, voice calls, video calls, and sharing emojis and GIFs.

![ABHI App](public/og-image.png)

## Features

- Real-time messaging
- Voice and video calling capabilities
- Contact management
- Emoji and GIF support
- Responsive design for all devices
- Dark mode support

## Live Demo

Access the live demo at: [https://bd58f309-6f20-4cae-b2f4-eec5e2107ccf.lovableproject.com](https://bd58f309-6f20-4cae-b2f4-eec5e2107ccf.lovableproject.com)

## How to Download and Run Locally

### Option 1: Clone from GitHub

```bash
# Step 1: Clone the repository
git clone https://github.com/your-username/abhi-messaging-app.git

# Step 2: Navigate to the project directory
cd abhi-messaging-app

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

### Option 2: Download as ZIP

1. Visit the GitHub repository at [https://github.com/your-username/abhi-messaging-app](https://github.com/your-username/abhi-messaging-app)
2. Click the green "Code" button and select "Download ZIP"
3. Extract the ZIP file to your desired location
4. Open a terminal in the extracted folder
5. Run `npm install` to install dependencies
6. Run `npm run dev` to start the development server

## Building for Production

```bash
# Build the app for production
npm run build

# Preview the production build locally
npm run preview
```

## Deploying to Your Own Server

### Using Netlify

1. Create an account on [Netlify](https://www.netlify.com/)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

### Using Vercel

1. Create an account on [Vercel](https://vercel.com/)
2. Import your GitHub repository
3. Configure project settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click "Deploy"

## Technology Stack

- Vite
- TypeScript
- React
- React Router
- Tailwind CSS
- shadcn/ui
- Lucide icons

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## Support

For any questions or issues, please open an issue in the GitHub repository or contact the project maintainers directly.
