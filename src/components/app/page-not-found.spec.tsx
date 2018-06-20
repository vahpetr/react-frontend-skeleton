import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppPageNotFoundComponent } from "src/components/app/page-not-found";

it("PageNotFound component renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AppPageNotFoundComponent />, div);
});
