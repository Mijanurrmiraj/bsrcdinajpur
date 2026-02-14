export const metadata = {
  title: "BSAP Frame",
  description: "বাংলাদেশ ছাত্র অধিকার পরিষদ ৮ম প্রতিষ্ঠাতা বার্ষিকী ফ্রেম"
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
