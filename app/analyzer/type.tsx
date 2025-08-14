type DataCollectionDetails = {
  contact_access: string;
  data_encryption: string;
  location_tracking: string;
};

type DataSharing = {
  header: string;
  body: string;
};

type PrivacyRisk = {
  header: string;
  body: string;
};

type Security = {
  header: string;
  body: string;
};

type Recommendations = {
  consider_alternatives: string;
  enable_privacy_features: string;
  review_app_permissions: string;
};

export type AnalysisWrapperData = {
  data_collection_details: DataCollectionDetails;
  data_sharing: DataSharing;
  privacy_risk: PrivacyRisk;
  recommendations: Recommendations;
  security: Security;
};

export type AnalysisResult = {
  wrapper_data: AnalysisWrapperData;
};