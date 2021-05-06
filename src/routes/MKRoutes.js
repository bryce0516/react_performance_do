/* eslint-disable react/no-children-prop */
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "../layout/Layout";
// import ManagerPage from "~/pages/mk/management/ManagerPage";
// import CommonPage from "~/pages/mk/management/CommonPage";
// import KitchenPage from "~/pages/mk/management/KitchenPage";
// import SettlementPage from "~/pages/mk/SettlementPage";
// import KitchenDetailPage from "~/pages/mk/management/KitchenPage/detailPage";
// import RequestPage from "~/pages/mk/serviceCenter/RequestPage";
// import NoticePage from "~/pages/mk/serviceCenter/NoticePage";
// import PromotionPage from "../pages/mk/management/Promotion";
// import PushPage from "~/pages/mk/management/PushPage";

export default function MKRoutes() {
  return (
    <div>
      <Switch>
        <Layout>
          {/* <Route path="/mk">
            <Redirect to="/mk/mk-management/manager" />
          </Route> */}
          {/* <Route
            exact
            path="/mk/mk-management/manager"
            component={ManagerPage}
          />
          <Route
            exact={true}
            path="/mk/mk-management/common"
            component={CommonPage}
          />
          <Route
            exact={true}
            path="/mk/mk-management/kitchen"
            component={KitchenPage}
          />
          <Route
            exact={true}
            path="/mk/settlement"
            component={SettlementPage}
          />
          <Route
            exact={true}
            path="/mk/mk-management/kitchen/:kitchenID"
            children={<KitchenDetailPage />}
          /> */}

          {/* <Route path="/mk/mk-management/promotion">
            <Redirect to="/mk/mk-management/promotion/sub_1" />
          </Route>
          <Route
            exact={true}
            path="/mk/mk-management/promotion/sub_1"
            component={PromotionPage}
          />
          <Route
            exact={true}
            path="/mk/mk-management/promotion/sub_2"
            component={PromotionPage}
          />
          <Route
            exact={true}
            path="/mk/mk-management/promotion/sub_4"
            component={PromotionPage}
          /> */}

          {/* <Route
            exact={true}
            path="/mk/mk-management/push"
            component={PushPage}
          />
          <Route
            exact
            path="/mk/service-center/request"
            component={RequestPage}
          />
          <Route
            exact={true}
            path="/mk/service-center/notice"
            component={NoticePage}
          /> */}
          {/* <Route
            exact
            path="/mk/service-center/review"
            component={ReviewPage}
          /> */}
        </Layout>
      </Switch>
    </div>
  );
}
