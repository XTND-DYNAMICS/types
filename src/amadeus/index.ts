import {ILoopback3Model, ILoopback3RemoteMethodRequest, ILoopback3RemoteMethodResponse} from "../loopback3";


// ENUMS

export enum AmadeusTransferServiceType {
    PrivateJet = "PRIVATE_JET",
    Helicopter = "HELICOPTER"
}

export enum AmadeusVehicleCategory {
    Helicopter = "HLC",
    Jet = "JET"
}

export enum AmadeusVehicleBookingClass {
}

export enum AmadeusLuggageType {
    Small = "small",
    Medium = "medium",
    Large = "large",
}

export enum AmadeusRateType {
    Fee = "fee",
    Base = "base",
    Rebate = "rebate",
    Total = "total",
    Commissionable = "commissionable"
}

export enum AmadeusPaymentMethod {
    CreditCard = "creditcard",
    Invoice = "invoice",
    TravelAccount = "travelaccount"
}


// INTERFACES

export interface IAmadeusModel extends ILoopback3Model {
    EVENTS: IAmadeusEvents;
    booking: IAmadeusBookingFn;
}

export interface IAmadeusEvents {
    ATTACHED: string;
    BOOKING_COMPLETE: string;
    AVAILABILITY_RESULT_AVAILABLE: string;
}

export interface IAmadeusRemoteMethodCallbackFn extends Function {
    (error: IAmadeusError, result?: IAmadeusResult);
}

export interface IAmadeusBookingFn extends Function {
    (bookingRequest: IAmadeusBookingRequest, req?: IAmadeusBookingRequest, res?: ILoopback3RemoteMethodResponse, callback?: Function): void;
}


export interface IAmadeusRequest extends ILoopback3RemoteMethodRequest {
}

export interface IAmadeusResult {
}

export interface IAmadeusStatusResult extends IAmadeusResult {
    status: string;
}

export interface IAmadeusWarning {
    code: string;
    title: string;
    detail: string;
    source: {
        pointer: string;
        parameter: string;
    };
}

export interface IAmadeusError {
    errorCode: string | number;
    errorMessage: string;
    amadeusErrorCode?: string;
}

export interface IAmadeusInputValidation {
    property: string;
    valueParseFn?: Function;
    validateFn: Function;
    compareWithValue?: any;
    compareWithProperty?: string;
    error: IAmadeusError;
}

export interface IAmadeusDataTransformation {
}

export interface IAmadeusTransferActivity {
    iata: string;
    dateTime?: string;
    country?: string;
    city?: string;
}

export interface IAmadeusTransfer {
    numberOfPassengers?: number;
    transferServiceType: AmadeusTransferServiceType;
    pickup: IAmadeusTransferActivity;
    dropoff: IAmadeusTransferActivity;
    baggage?: AmadeusLuggageType;
    vehicle: IAmadeusVehicle;
    quotation: {
        quote: Array<IAmadeusQuotation>;
    };
    multimedia?: any[];
    cancellationPolicy: any[];
    paymentType: string;
}

export interface IAmadeusVehicle {
    seatsCapacity: number;
    bkgClass: AmadeusVehicleBookingClass;
    category: AmadeusVehicleCategory;
    acrissCategory?: string;
    carBrand: string;
    carModel: string;
    color: string;
    description: string;
    review: Array<IAmadeusReview>;
}

export interface IAmadeusQuotation {
    quote: IAmadeusQuote;
}

export interface IAmadeusQuote {
    quoteIdentifier: string;
    type: AmadeusRateType;
    priceAmount: string;
    priceCurrencyCode: string;
    priceDecimalPlaces: string;
}

export interface IAmadeusBaggageDefinition {
    quantity: number;
    type: AmadeusLuggageType;
}

export interface IAmadeusPaymentInformation {
    invoiceReference: string;
}

export interface IAmadeusIdentityForm {
}

export interface IAmadeusBookingTransfer extends IAmadeusTransfer {
    paymentMethod: string;
    passenger: Array<IAmadeusTransferPassenger>;
}

export interface IAmadeusBooking {
    reservationStatus: string;
    confirmationNumber: string;
    timestamp: string;
    transfer: IAmadeusBookingTransfer;
}

export interface IAmadeusTransferPassenger {
    type: string;
    title: string;
    age: string;
    firstName: string;
    lastName: string;
    mobilePhone: string;
    email: string;
    address?: any;
}

export interface IAmadeusAuthorizationResult extends IAmadeusResult {
    access_token: string;
    expires_in: number;
}

export interface IAmadeusAvailabilityResult extends IAmadeusResult {
    transfer: Array<IAmadeusTransfer>;
    warnings?: Array<IAmadeusWarning>;
}

export interface IAmadeusAvailabilityRequest extends IAmadeusRequest {
    numberOfPassengers: number;
    transferServiceType: AmadeusTransferServiceType;
    pickup: IAmadeusTransferActivity;
    dropoff: IAmadeusTransferActivity;
}

export interface IAmadeusBookingRequestBody {

    languageCode?: string;
    altLanguageCode?: string;

    transferServiceType: string;
    subProviderCode?: string;
    subProviderName?: string;

    pickup: IAmadeusTransferActivity;
    dropoff: IAmadeusTransferActivity;

    duration?: string;
    numberOfPassengers: number;

    pnrRecordLocator?: string;
    flightNumber?: string;

    passenger: Array<IAmadeusTransferPassenger>;

    baggage?: IAmadeusBaggageDefinition;

    remark?: string;

    quotation: IAmadeusQuotation;

    corporateNumber?: string;
    promotionalCode?: string;
    loyaltyNumber?: string;
    loyaltyProgram?: string;
    corporation?: any;

    paymentMethod: AmadeusPaymentMethod;
    payment: IAmadeusPaymentInformation;

    formOfIdentification?: IAmadeusIdentityForm;

    vehicle: IAmadeusVehicle;

    driver?: IAmadeusDriver;
    services?: Array<IAmadeusService>;
    equipment?: Array<IAmadeusEquipment>;

    amadeusTransactionID: string;
    amadeusOfficeID?: string;

    travelAgencyIATA?: string;
}

export interface IAmadeusBookingRequest extends IAmadeusRequest, IAmadeusBookingRequestBody {
}

export interface IAmadeusDriver {
    language?: string;
    altLanguage?: string;
    review?: Array<IAmadeusReview>;
}

export interface IAmadeusReview {
    score: string;
}

export interface IAmadeusService {
    id: string;
    code: string;
    metricType: string;
    metricValue: string;
    priceAmount: string;
    decimalPlaces: string;
    currencyCode: string;
    taxIncluded: boolean;
    includedInTotal: boolean;
}

export interface IAmadeusEquipment {
    id: string;
    code: string;
    priceAmount: string;
    decimalPlaces: string;
    currencyCode: string;
    taxIncluded: boolean;
    includedInTotal: boolean;
}

export interface IAmadeusBookingResult extends IAmadeusResult {
    booking: IAmadeusBooking;
    warnings?: Array<IAmadeusWarning>;
}
