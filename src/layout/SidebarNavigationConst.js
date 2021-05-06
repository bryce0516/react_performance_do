const linkListReducer = (acc, curr) => {
  if (curr.subList.length > 0) {
    return [...acc, ...curr.subList];
  } else {
    return [...acc, { ...curr }];
  }
};

export const traverseByLink = (targetLink) => {
  const searchResult = [
    ...MKSidebarList.reduce(linkListReducer, []),
    ...KitchenSidebarList.reduce(linkListReducer, []),
  ].find(
    (item) =>
      item.link.startsWith(item.link) === targetLink.startsWith(item.link)
  );

  if (searchResult) {
    return searchResult.displayValue;
  } else {
    return "";
  }
};

export const MKSidebarList = [
  {
    displayValue: "MK관리",
    link: "/mk/mk-management",
    subList: [
      {
        displayValue: "관리자 설정",
        link: "/mk/mk-management/manager",
      },
      {
        displayValue: "MK공통 설정",
        link: "/mk/mk-management/common",
      },
      {
        displayValue: "지점 관리",
        link: "/mk/mk-management/kitchen",
      },
      {
        displayValue: "광고/이벤트",
        link: "/mk/mk-management/promotion",
      },
      {
        displayValue: "푸시 관리",
        link: "/mk/mk-management/push",
      },
    ],
  },
  {
    displayValue: "고객센터",
    link: "/mk/service-center",
    subList: [
      {
        displayValue: "요청 관리",
        link: "/mk/service-center/request",
      },
      {
        displayValue: "공지 관리",
        link: "/mk/service-center/notice",
      },
    ],
  },
];

export const KitchenSidebarList = [
  {
    displayValue: "지점관리자",
    link: "/kitchen/kitchen-management",
    subList: [
      {
        displayValue: "지점 설정",
        link: "/kitchen/kitchen-management/category",
      },
      {
        displayValue: "입점매장 관리",
        link: "/kitchen/kitchen-management/store",
      },
      // {
      //   displayValue: "광고/이벤트 관리",
      //   link: "/kitchen/kitchen-management/promotion",
      // },
      {
        displayValue: "리뷰관리",
        link: "/kitchen/kitchen-management/review",
      },
      {
        displayValue: "할인/쿠폰",
        link: "/kitchen/kitchen-management/coupon",
      },
    ],
  },
];
