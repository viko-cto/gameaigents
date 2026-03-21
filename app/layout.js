import './globals.css';

export const metadata = {
  title: 'GameAIgents',
  description: 'Godot-first creator-to-production copilot alpha workspace.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
