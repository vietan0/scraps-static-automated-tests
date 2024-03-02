import { Component, ErrorInfo } from 'react';

export class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true }; // basically setting state
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('<ErrorBoundary /> caught an error', error, errorInfo);
  }

  handleClick = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      // fallback UI
      return (
        <div>
          <h2 role="alert">There was an error</h2>
          <button onClick={this.handleClick}>Try Again</button>
          <a href="/">Go Home</a>
        </div>
      );
    }

    return this.props.children;
  }
}
