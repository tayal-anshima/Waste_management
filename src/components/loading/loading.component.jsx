import React from "react";
import AppStart from "../app-start/app-start.component";
import "./loading.styles.css";
function Loading(WrappedComponent) {
  return function ({ isLoading, ...otherProps }) {
    return (
      <>
        {isLoading ? (
          <div className="is-loading">
            <AppStart />
          </div>
        ) : (
          <WrappedComponent {...otherProps} />
        )}
      </>
    );
  };
}

export default Loading;