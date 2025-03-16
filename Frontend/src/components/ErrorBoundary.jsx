import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h1>Something went wrong!</h1>
          <p>We're working to fix it. Please try again later.</p>
          <a href="/">Go Back Home</a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
