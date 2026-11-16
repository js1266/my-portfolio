import PropTypes from "prop-types";
import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("UI error:", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div role="alert" className="grid min-h-[60vh] place-items-center px-5 text-center">
        <div>
          <h1 className="text-3xl">Something went wrong</h1>
          <p className="mt-2 text-sm text-muted">Please refresh the page and try again.</p>
          <button
            type="button"
            className="btn-primary mt-6"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </div>
      </div>
    );
  }
}

ErrorBoundary.propTypes = { children: PropTypes.node.isRequired };
