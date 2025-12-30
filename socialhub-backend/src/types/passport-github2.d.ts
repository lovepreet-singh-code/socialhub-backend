declare module 'passport-github2' {
    import { Strategy as PassportStrategy } from 'passport-strategy';
    import { Request } from 'express';

    export interface Profile {
        id: string;
        displayName: string;
        username?: string;
        profileUrl?: string;
        emails?: Array<{
            value: string;
            primary?: boolean;
            verified?: boolean;
        }>;
        photos?: Array<{
            value: string;
        }>;
        provider: 'github';
        _raw: string;
        _json: any;
    }

    export interface StrategyOptions {
        clientID: string;
        clientSecret: string;
        callbackURL: string;
        scope?: string[];
        userAgent?: string;
        authorizationURL?: string;
        tokenURL?: string;
        scopeSeparator?: string;
        customHeaders?: any;
        userProfileURL?: string;
    }

    export interface StrategyOptionsWithRequest extends StrategyOptions {
        passReqToCallback: true;
    }

    export type VerifyCallback = (err?: Error | null, user?: any, info?: any) => void;

    export type VerifyFunction = (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback
    ) => void;

    export type VerifyFunctionWithRequest = (
        req: Request,
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback
    ) => void;

    export class Strategy extends PassportStrategy {
        constructor(options: StrategyOptions, verify: VerifyFunction);
        constructor(options: StrategyOptionsWithRequest, verify: VerifyFunctionWithRequest);

        name: string;
        authenticate(req: Request, options?: any): void;
    }
}
