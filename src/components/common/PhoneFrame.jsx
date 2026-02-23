import { COLORS } from "../../constants/colors";

export default function PhoneFrame({ children }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 430,
        margin: "0 auto",
        background: COLORS.bg,
        minHeight: "100vh",
        position: "relative",
        fontFamily:
          '-apple-system, "SF Pro Display", "PingFang SC", "Helvetica Neue", sans-serif',
        overflowX: "hidden",
      }}
    >
      {children}
    </div>
  );
}
