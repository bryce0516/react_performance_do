import React from "react";
import { Switch, Route, Redireact } from "react-router-dom";
import Layout from "../layout/Layout";
// import CategoryPage from "~/pages/kitchen/management/CategoryPage/CategoryPage";

export default function MKRoutes() {
  return (
    <div>
      <Switch>
        <Layout>
          {/* <Route path="/kitchen">
            <Redirect to="/kitchen/kitchen-management/category" />
          </Route>
          <Route exact path="/kitchen/kitchen-management/category">
            <Redirect to="/kitchen/kitchen-management/category/sub_1" />
          </Route>
          <Route
            exact
            path="/kitchen/kitchen-management/category/sub_1"
            component={CategoryPage}
          />
          <Route
            path="/kitchen/kitchen-management/category/sub_2"
            component={CategoryPage}
          />
          <Route
            exact={true}
            path="/kitchen/kitchen-management/store"
            component={StorePage}
          />
          <Route
            exact={true}
            path="/kitchen/kitchen-management/store/:storeID"
            children={<StoreDetailPage />}
          />
          <Route exact path="/kitchen/kitchen-management/coupon">
            <Redirect to="/kitchen/kitchen-management/coupon/sub_1" />
          </Route>
          <Route
            path="/kitchen/kitchen-management/coupon/sub_1"
            component={CouponPage}
          />
          <Route
            path="/kitchen/kitchen-management/coupon/sub_2"
            component={CouponPage}
          />
          <Route
            exact
            path="/kitchen/kitchen-management/review"
            component={ReviewPage}
          /> */}
        </Layout>
      </Switch>
    </div>
  );
}
