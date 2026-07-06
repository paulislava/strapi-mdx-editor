import { Component } from 'react';

export class ErrorBoundary extends Component<{
  children?: React.ReactNode;
  fallback?: (error: any) => React.ReactNode;
}> {
  state = {
    error: null as null | any,
  };
  static getDerivedStateFromError(error: any) {
    return { error };
  }
  render() {
    const { error } = this.state;

    if (error) {
      console.error(error);

      return (
        <>
          <div>
            <p>Seems like an error occured!</p>
            <p>{error.message}</p>
          </div>
          {this.props.fallback && (
            <div>
              {typeof this.props.fallback === 'function'
                ? this.props.fallback(error)
                : this.props.fallback}
            </div>
          )}
        </>
      );
    }
    return this.props.children;
  }
}
