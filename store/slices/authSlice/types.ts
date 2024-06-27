export type User = {
  name: {
    first: string;
    last: string;
    full: string;
  };
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  smsData: {
    tries: 1;
    lastTry: string;
  };
  rating: {
    count: number;
    sumProductsQualityNote: number;
    sumDeliveryNote: number;
    avgProductsQualityNote: number;
    avgDeliveryNote: number;
  };
  stats: {
    allPurchase: {
      count: number;
      sum: number;
      avg: number;
    };
    basket: {
      count: number;
      sum: number;
      avg: number;
    };
    confirmed: {
      count: number;
      sum: number;
      avg: number;
    };
    inPreparation: {
      count: number;
      sum: number;
      avg: number;
    };
    ready: {
      count: number;
      sum: number;
      avg: number;
    };
    delivering: {
      count: number;
      sum: number;
      avg: number;
    };
    deposed: {
      count: number;
      sum: number;
      avg: number;
    };
    recuperated: {
      count: number;
      sum: number;
      avg: number;
    };
    returned: {
      count: number;
      sum: number;
      avg: number;
    };
    cancelledByClient: {
      count: number;
      sum: number;
      avg: number;
    };
    cancelledByAdmin: {
      count: number;
      sum: number;
      avg: number;
    };
  };
  deviceInfo: {
    uniqueID: string;
    manufacturer: string;
    model: string;
    systemVersion: string;
  };
  fidelity: {
    comoMemberId: string;
    gifts: {
      _id: string;
      key: string;
      name: string;
      description: string;
      status: string;
      image: string;
      validFrom: string;
      validUntil: string;
      isDispo: boolean;
    }[];
  };
  comoMembership: {
    pointsBalance: {
      balance: {
        monetary: number;
        nonMonetary: number;
      };
      usedByPayment: boolean;
    };
    phoneNumber: string;
    genericString2: string;
    commonExtId: string;
    createdOn: string;
    status: string;
    assets: {
      _id: string;
      key: string;
      name: string;
      description: string;
      status: string;
      image: string;
      validFrom: string;
      validUntil: string;
    }[];
    comoMemberId: string;
  };
  accountEnabled: boolean;
  pushNotifEnabled: boolean;
  username: string;
  address1: string;
  address2: string;
  zipcode: string;
  city: string;
  quartier: string;
  country: string;
  newslettersAccepted: boolean;
  smsAccepted: boolean;
  cguAccepted: boolean;
  hasOrdered: boolean;
  provider: string;
  roles: string[];
  isMale: boolean;
  oneSignalPlayerId: string;
  oneSignalPlayerIds: string[];
  lastAuthenticationDate: string;
  _id: string;
  countryCode: string;
  phone: string;
  fcmToken: string;
  lastUsageDate: string;
  uuid: string;
  validations: {
    validated: boolean;
    resends: number;
    tries: number;
    created: string;
    _id: string;
    type: string;
    code: string;
  }[];
  cards: any[];
  created_at: string;
  updated_at: string;
  civility: string;
  email: string;
  profilePictureUrl: string;
  id: string;
  is_user: boolean;
  dbModelName: string;
  role: string;
  finalizedOrders: number;
  unratedOrders: any[];
};

export interface AuthState {
  loading: { login: boolean; register: boolean; updateProfile: boolean };
  error: { login: any; register: any; updateProfile: any };
  token?: string | null;
  user?: User | null;
  smsVerificationProps: { phone: string; code: string };
}
