import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("App error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-100 px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Er ging iets mis
          </p>
          <h1 className="mt-3 text-2xl font-bold text-gray-900">
            Vernieuw de pagina of ga terug naar home
          </h1>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-black"
          >
            Naar FietsHaven
          </Link>
        </div>
      );
    }
    return this.props.children;
  }
}
