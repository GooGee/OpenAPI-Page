declare module "Entity/ColorEnum" {
    enum ColorEnum {
        none = "",
        red = "#f00",
        magenta = "#f0f",
        orange = "#f80",
        yellow = "#ff0",
        green = "#0f0",
        aqua = "#0ff",
        blue = "#00f",
        skyblue = "#08f",
        purple = "#80f"
    }
    export const colorxx: ColorEnum[];
    export default ColorEnum;
}
declare module "Decorator" {
    export const exclude: (target: Record<string, any>, propertyKey: string) => void;
    export const include: (target: Record<string, any>, propertyKey: string) => void;
    export const getExcludedList: (constructor: Function) => string[];
    export const getIncludedList: (constructor: Function) => string[];
    export const excludeOAPI: (target: Record<string, any>, propertyKey: string) => void;
    export const includeOAPI: (target: Record<string, any>, propertyKey: string) => void;
    export const getOAPIExcludedList: (constructor: Function) => string[];
    export const getOAPIIncludedList: (constructor: Function) => string[];
}
declare module "Entity/ObjectMap" {
    export default interface ObjectMap<T = string> {
        [key: string]: T;
    }
}
declare module "Entity/ItemInterface" {
    import ObjectMap from "Entity/ObjectMap";
    export default interface ItemInterface {
        getKeyList(): string[];
        getOAPIKeyList(): string[];
        load(data: this): void;
        toJSON(): ObjectMap<any>;
        toOAPI(...args: any[]): ObjectMap<any>;
    }
}
declare module "Entity/Loadable" {
    export default class Loadable {
        load(data: this): void;
    }
}
declare module "Entity/Item" {
    import ItemInterface from "Entity/ItemInterface";
    import Loadable from "Entity/Loadable";
    import ObjectMap from "Entity/ObjectMap";
    export default class Item extends Loadable implements ItemInterface {
        protected getDescriptor(name: PropertyKey): PropertyDescriptor | undefined;
        getKeyList(): string[];
        getOAPIKeyList(): string[];
        load(source: this): void;
        protected loadProperty(name: keyof this, source: this): void;
        toJSON(): ObjectMap<any>;
        toOAPI(...args: any[]): ObjectMap<any>;
    }
}
declare module "Entity/UIItemInterface" {
    import ItemInterface from "Entity/ItemInterface";
    export default interface UIItemInterface extends ItemInterface {
        ui: number;
    }
}
declare module "Entity/UniqueItemInterface" {
    import UIItemInterface from "Entity/UIItemInterface";
    export default interface UniqueItemInterface extends UIItemInterface {
        un: string;
        camelCase: string;
        snakeCase: string;
        wavelCase: string;
    }
}
declare module "OAPI/TargetType" {
    enum TargetType {
        encoding = "encoding",
        enumer = "enumer",
        examples = "examples",
        field = "field",
        flow = "flow",
        headers = "headers",
        links = "links",
        parameters = "parameters",
        paths = "paths",
        requestBodies = "requestBodies",
        responses = "responses",
        schemas = "schemas",
        scope = "scope",
        script = "script",
        security = "security",
        tag = "tag",
        variable = "variable"
    }
    export default TargetType;
}
declare module "OAPI/ReferenceInterface" {
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import UIItemInterface from "Entity/UIItemInterface";
    import UniqueItemInterface from "Entity/UniqueItemInterface";
    import TargetType from "OAPI/TargetType";
    export interface OAPIReference {
        $ref: string;
    }
    export default interface ReferenceInterface extends UIItemInterface {
        type: TargetType;
        ui: number;
        getTarget<T extends UniqueItemInterface>(finder: ReferenceFinderInterface): T | undefined;
        getText(finder: ReferenceFinderInterface): string;
        getTextOfTarget<T extends UniqueItemInterface>(source: T): string;
        toOAPI(finder: ReferenceFinderInterface): OAPIReference;
        toOAPIofTarget<T extends UniqueItemInterface>(target?: T): OAPIReference;
    }
}
declare module "Entity/ManagerInterface" {
    export default interface ManagerInterface<T> {
        readonly list: Array<T>;
        add(item: T): void;
        remove(item: T): void;
        clear(): void;
        moveUp(item: T): void;
        moveDown(item: T): void;
        swap(left: number, right: number): void;
    }
}
declare module "Entity/ItemManagerInterface" {
    import ItemInterface from "Entity/ItemInterface";
    import ManagerInterface from "Entity/ManagerInterface";
    export default interface ItemManagerInterface<T extends ItemInterface> extends ManagerInterface<T> {
        load(manager: this): void;
        loadList(list: T[]): void;
        make(...args: any[]): T;
        toJSON(): {
            list: T[];
        };
        toOAPIArray(...args: any[]): any[];
    }
}
declare module "Entity/UIItemManagerInterface" {
    import ItemManagerInterface from "Entity/ItemManagerInterface";
    import UIItemInterface from "Entity/UIItemInterface";
    export default interface UIItemManagerInterface<T extends UIItemInterface = UIItemInterface> extends ItemManagerInterface<T> {
        nextUI: number;
        add(item: T): void;
        find(ui: number): T | undefined;
        findAll(uixx: number[]): T[];
        has(ui: number): boolean;
        load(manager: this): void;
        throwIfFind(ui: number): void;
        uixx: number[];
    }
}
declare module "Entity/UniqueItemManagerInterface" {
    import ObjectMap from "Entity/ObjectMap";
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import UIItemManagerInterface from "Entity/UIItemManagerInterface";
    import UniqueItemInterface from "Entity/UniqueItemInterface";
    export default interface UniqueItemManagerInterface<T extends UniqueItemInterface = UniqueItemInterface> extends UIItemManagerInterface<T> {
        readonly unique: boolean;
        add(item: T): void;
        arrayToOAPI(list: T[], finder: ReferenceFinderInterface): ObjectMap<any>;
        changeUN(item: T, un: string): void;
        filter(keyword: string): UniqueItemInterface[];
        findByUN(name: string): T | undefined;
        findByUNOrMakeAdd(name: string): T;
        hasSame(ui: number, un: string): boolean;
        hasUN(name: string): boolean;
        make(name: string): T;
        sort(asc?: boolean): void;
        throwIfFindUN(name: string): void;
        throwIfNotUnique(item: T): void;
        toJSON(): {
            nextUI: number;
            list: T[];
        };
        toOAPI(finder: ReferenceFinderInterface): ObjectMap<any>;
        unxx: string[];
    }
}
declare module "Entity/ReferenceFinderInterface" {
    import ReferenceInterface from "OAPI/ReferenceInterface";
    import TargetType from "OAPI/TargetType";
    import UniqueItemInterface from "Entity/UniqueItemInterface";
    import UniqueItemManagerInterface from "Entity/UniqueItemManagerInterface";
    export default interface ReferenceFinderInterface {
        find<T extends UniqueItemInterface>(reference: ReferenceInterface): T | undefined;
        findByUI<T extends UniqueItemInterface>(ui: number, type: TargetType): T | undefined;
        findManager(type: TargetType): UniqueItemManagerInterface;
        getSchemaFieldList(schema: UniqueItemInterface): UniqueItemInterface[];
    }
}
declare module "Entity/UIItem" {
    import Item from "Entity/Item";
    import UIItemInterface from "Entity/UIItemInterface";
    export default class UIItem extends Item implements UIItemInterface {
        protected _ui: number;
        protected get allowSetUI(): boolean;
        get ui(): number;
        set ui(ui: number);
    }
}
declare module "Entity/UniqueItem" {
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import UIItem from "Entity/UIItem";
    import UniqueItemInterface from "Entity/UniqueItemInterface";
    export default class UniqueItem extends UIItem implements UniqueItemInterface {
        protected _un: string;
        constructor(name: string);
        get camelCase(): string;
        get snakeCase(): string;
        get wavelCase(): string;
        get un(): string;
        set un(name: string);
        toOAPI(finder: ReferenceFinderInterface): import("Entity/ObjectMap").default<any>;
    }
}
declare module "Entity/Layer" {
    import TargetType from "OAPI/TargetType";
    import UniqueItem from "Entity/UniqueItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    export default class Layer extends UniqueItem {
        readonly type: TargetType;
        constructor(name: string, type: TargetType);
        get unPattern(): string;
        set unPattern(text: string);
    }
    export class LayerManager extends UniqueItemManager<Layer> {
        readonly targetType: TargetType;
        constructor(targetType: TargetType);
        make(name: string): Layer;
    }
}
declare module "Entity/Manager" {
    import Loadable from "Entity/Loadable";
    import ManagerInterface from "Entity/ManagerInterface";
    export default class Manager<T> extends Loadable implements ManagerInterface<T> {
        readonly list: Array<T>;
        add(item: T): void;
        remove(item: T): void;
        clear(): void;
        moveUp(item: T): void;
        moveDown(item: T): void;
        swap(left: number, right: number): void;
    }
}
declare module "Entity/Newable" {
    export default interface Newable<T> {
        new (...args: any[]): T;
    }
}
declare module "Entity/ItemManager" {
    import ItemInterface from "Entity/ItemInterface";
    import ItemManagerInterface from "Entity/ItemManagerInterface";
    import Manager from "Entity/Manager";
    import Newable from "Entity/Newable";
    export default class ItemManager<T extends ItemInterface> extends Manager<T> implements ItemManagerInterface<T> {
        protected readonly type: Newable<T>;
        constructor(type: Newable<T>);
        load(manager: this): void;
        loadList(list: T[]): void;
        protected loadItem(item: T): void;
        make(...args: any[]): T;
        toJSON(): {
            list: T[];
        };
        toOAPIArray(...args: any[]): any[];
    }
}
declare module "Entity/UIItemManager" {
    import ItemManager from "Entity/ItemManager";
    import UIItemInterface from "Entity/UIItemInterface";
    import UIItemManagerInterface from "Entity/UIItemManagerInterface";
    export default class UIItemManager<T extends UIItemInterface = UIItemInterface> extends ItemManager<T> implements UIItemManagerInterface {
        protected _nextUI: number;
        get nextUI(): number;
        add(item: T): void;
        find(ui: number): T | undefined;
        findAll(uixx: number[]): T[];
        findOrMakeAdd(ui: number): T;
        has(ui: number): boolean;
        load(manager: this): void;
        protected loadItem(item: T): T;
        remove(item: T): void;
        throwIfFind(ui: number): void;
        get uixx(): number[];
    }
}
declare module "OAPI/Reference" {
    import ObjectMap from "Entity/ObjectMap";
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import UIItem from "Entity/UIItem";
    import UIItemManager from "Entity/UIItemManager";
    import UniqueItemInterface from "Entity/UniqueItemInterface";
    import ReferenceInterface, { OAPIReference } from "OAPI/ReferenceInterface";
    import TargetType from "OAPI/TargetType";
    export type OAPIReferenceMap = ObjectMap<OAPIReference>;
    export default class Reference extends UIItem implements ReferenceInterface {
        type: TargetType;
        constructor(ui: number, type: TargetType);
        get ui(): number;
        set ui(ui: number);
        getTarget<T extends UniqueItemInterface>(finder: ReferenceFinderInterface): T | undefined;
        getText(finder: ReferenceFinderInterface): string;
        getTextOfTarget<T extends UniqueItemInterface>(source: T): string;
        toOAPI(finder: ReferenceFinderInterface): OAPIReference;
        toOAPIofTarget<T extends UniqueItemInterface>(target?: T): OAPIReference;
    }
    export class ReferenceManager extends UIItemManager<ReferenceInterface> {
        readonly targetType: TargetType;
        constructor(targetType: TargetType);
        add(item: ReferenceInterface): void;
        getTargetxx(finder: ReferenceFinderInterface): UniqueItemInterface[];
        getUNxx(finder: ReferenceFinderInterface): string[];
        protected loadItem(item: ReferenceInterface): ReferenceInterface;
        make(ui: number): ReferenceInterface;
        toOAPI(finder: ReferenceFinderInterface): OAPIReferenceMap;
        toOAPIArray(finder: ReferenceFinderInterface): OAPIReference[];
    }
}
declare module "Entity/LayerMediaType" {
    import UniqueItem from "Entity/UniqueItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    export default class LayerMediaType extends UniqueItem {
        protected get allowSetUI(): boolean;
    }
    export class LayerMediaTypeManager extends UniqueItemManager<LayerMediaType> {
        constructor();
    }
}
declare module "Entity/LayerSchema" {
    import Reference from "OAPI/Reference";
    import UniqueItem from "Entity/UniqueItem";
    export default class LayerSchema extends UniqueItem {
        readonly script: Reference;
        get unPattern(): string;
        set unPattern(text: string);
    }
}
declare module "Entity/LayerRequestBody" {
    import Reference from "OAPI/Reference";
    import { LayerMediaTypeManager } from "Entity/LayerMediaType";
    import LayerSchema from "Entity/LayerSchema";
    import UniqueItem from "Entity/UniqueItem";
    export default class LayerRequestBody extends UniqueItem {
        useExisted: boolean;
        get unPattern(): string;
        set unPattern(text: string);
        readonly mtManager: LayerMediaTypeManager;
        readonly reference: Reference;
        readonly schema: LayerSchema;
    }
}
declare module "Entity/LayerResponse" {
    import Reference from "OAPI/Reference";
    import { LayerMediaTypeManager } from "Entity/LayerMediaType";
    import LayerSchema from "Entity/LayerSchema";
    import UniqueItem from "Entity/UniqueItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    export default class LayerResponse extends UniqueItem {
        unPattern: string;
        useExisted: boolean;
        readonly mtManager: LayerMediaTypeManager;
        readonly reference: Reference;
        readonly schema: LayerSchema;
        protected get allowSetUI(): boolean;
    }
    export class LayerResponseManager extends UniqueItemManager<LayerResponse> {
        constructor();
    }
}
declare module "OAPI/Scope" {
    import UniqueItem from "Entity/UniqueItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    export default class Scope extends UniqueItem {
        description: string;
    }
    export class ScopeManager extends UniqueItemManager<Scope> {
        constructor();
    }
}
declare module "OAPI/OAuthFlow" {
    import ObjectMap from "Entity/ObjectMap";
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import UniqueItem from "Entity/UniqueItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    import { ReferenceManager } from "OAPI/Reference";
    export interface OAPIOAuthFlow {
        authorizationUrl?: string;
        refreshUrl: string;
        scopes: ObjectMap;
        tokenUrl?: string;
    }
    export default class OAuthFlow extends UniqueItem {
        authorizationUrl: string;
        refreshUrl: string;
        tokenUrl: string;
        readonly scopeManager: ReferenceManager;
        get hasAuthorization(): boolean;
        get hasToken(): boolean;
        toOAPI(finder: ReferenceFinderInterface): OAPIOAuthFlow;
    }
    export class OAuthFlowManager extends UniqueItemManager<OAuthFlow> {
        constructor();
        addToAll(ui: number): void;
    }
}
declare module "Entity/LayerSecurityScheme" {
    import { OAuthFlowManager } from "OAPI/OAuthFlow";
    import Layer, { LayerManager } from "Entity/Layer";
    export default class LayerSecurityScheme extends Layer {
        readonly oAuthFlowManager: OAuthFlowManager;
        readonly scopeManager: LayerManager;
        get unPattern(): string;
        set unPattern(text: string);
    }
}
declare module "Entity/LayerOperation" {
    import { LayerManager } from "Entity/Layer";
    import LayerRequestBody from "Entity/LayerRequestBody";
    import { LayerResponseManager } from "Entity/LayerResponse";
    import LayerSecurityScheme from "Entity/LayerSecurityScheme";
    import UniqueItem from "Entity/UniqueItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    export default class LayerOperation extends UniqueItem {
        withRequestBody: boolean;
        withSecurity: boolean;
        readonly parameterManager: LayerManager;
        readonly requestBody: LayerRequestBody;
        readonly security: LayerSecurityScheme;
        readonly statusManager: LayerResponseManager;
        readonly tagManager: LayerManager;
    }
    export class LayerOperationManager extends UniqueItemManager<LayerOperation> {
        constructor();
    }
}
declare module "Entity/SideBarItem" {
    import ColorEnum from "Entity/ColorEnum";
    import UniqueItem from "Entity/UniqueItem";
    export default class SideBarItem extends UniqueItem {
        color: ColorEnum;
        description: string;
    }
}
declare module "Entity/LayerPath" {
    import { LayerManager } from "Entity/Layer";
    import LayerOperation from "Entity/LayerOperation";
    import SideBarItem from "Entity/SideBarItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    export default class LayerPath extends SideBarItem {
        unPattern: string;
        suffix: string;
        readonly operation: LayerOperation;
        readonly parameterManager: LayerManager;
    }
    export class LayerPathManager extends UniqueItemManager<LayerPath> {
        constructor();
    }
}
declare module "Entity/JSONText" {
    import Item from "Entity/Item";
    export default class JSONText extends Item {
        value: Object;
        get text(): string;
        set text(text: string);
        toOAPI(): Object;
    }
}
declare module "OAPI/NameReference" {
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import UniqueItem from "Entity/UniqueItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    import Reference from "OAPI/Reference";
    import TargetType from "OAPI/TargetType";
    export default class NameReference extends UniqueItem {
        readonly reference: Reference;
        constructor(name: string, type: TargetType);
        protected get allowSetUI(): boolean;
        toOAPI(finder: ReferenceFinderInterface): import("OAPI/ReferenceInterface").OAPIReference;
    }
    export class NameReferenceManager extends UniqueItemManager<NameReference> {
        readonly targetType: TargetType;
        constructor(targetType: TargetType);
        add(item: NameReference): void;
        make(name: string): NameReference;
    }
}
declare module "OAPI/Discriminator" {
    import Item from "Entity/Item";
    import ObjectMap from "Entity/ObjectMap";
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import { NameReferenceManager } from "OAPI/NameReference";
    export interface OAPIDiscriminator {
        propertyName: string;
        mapping: ObjectMap;
    }
    export default class Discriminator extends Item {
        propertyName: string;
        readonly referenceManager: NameReferenceManager;
        private makeMapping;
        toOAPI(finder: ReferenceFinderInterface): OAPIDiscriminator;
    }
}
declare module "OAPI/DataType" {
    enum DataType {
        boolean = "boolean",
        enumer = "enumer",
        integer = "integer",
        number = "number",
        object = "object",
        reference = "reference",
        string = "string"
    }
    export const dataTypeList: DataType[];
    export default DataType;
}
declare module "OAPI/SchemaField" {
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import UniqueItem from "Entity/UniqueItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    import DataType from "OAPI/DataType";
    import Reference from "OAPI/Reference";
    import { OAPIReference } from "OAPI/ReferenceInterface";
    export interface OAPISchemaField {
        description?: string;
        format?: string;
        items?: OAPISchemaField | OAPIReference;
        readOnly?: boolean;
        type: string;
        writeOnly?: boolean;
    }
    export default class SchemaField extends UniqueItem {
        description: string;
        format: string;
        isArray: boolean;
        readOnly: boolean;
        required: boolean;
        schemaUI: number;
        protected _type: DataType;
        writeOnly: boolean;
        readonly reference: Reference;
        get isEnumer(): boolean;
        get isObject(): boolean;
        get isReference(): boolean;
        get type(): DataType;
        set type(type: DataType);
        refer(ui: number): void;
        makeData(finder: ReferenceFinderInterface): any;
        toOAPI(finder: ReferenceFinderInterface): OAPISchemaField | OAPIReference;
    }
    export class SchemaFieldManager extends UniqueItemManager<SchemaField> {
        constructor(unique?: boolean);
        changeUN(item: SchemaField, un: string): void;
        findAllField(schemaUI: number): SchemaField[];
        findField(schemaUI: number, un: string): SchemaField | undefined;
        throwIfNotUnique(item: SchemaField): void;
    }
}
declare module "OAPI/Schema" {
    import JSONText from "Entity/JSONText";
    import ObjectMap from "Entity/ObjectMap";
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import SideBarItem from "Entity/SideBarItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    import Discriminator, { OAPIDiscriminator } from "OAPI/Discriminator";
    import { ReferenceManager } from "OAPI/Reference";
    import { OAPIReference } from "OAPI/ReferenceInterface";
    import SchemaField, { SchemaFieldManager } from "OAPI/SchemaField";
    export enum CompositionType {
        allOf = "allOf",
        anyOf = "anyOf",
        multipleOf = "multipleOf",
        oneOf = "oneOf"
    }
    export const compositionTypeList: CompositionType[];
    export interface OAPISchema {
        description: string;
        example?: Object;
        required?: string[];
    }
    export type OAPIComposition = OAPISchema & {
        [key in CompositionType]?: OAPIReference[];
    } & {
        discriminator?: OAPIDiscriminator;
    };
    export interface OAPISchemaObject extends OAPISchema {
        properties: ObjectMap;
        type: string;
    }
    export default class Schema extends SideBarItem {
        compositionType: CompositionType;
        isTemplate: boolean;
        readonly discriminator: Discriminator;
        readonly example: JSONText;
        readonly excludedManager: ReferenceManager;
        readonly flowManager: ReferenceManager;
        readonly referenceManager: ReferenceManager;
        readonly requiredManager: ReferenceManager;
        readonly text: JSONText;
        get isComposition(): boolean;
        protected makeOAPI(finder: ReferenceFinderInterface, fieldManager: SchemaFieldManager, fieldxx: SchemaField[]): Object;
        toOAPI(finder: ReferenceFinderInterface): Object;
    }
    export class SchemaManager extends UniqueItemManager<Schema> {
        constructor();
    }
}
declare module "Bridge/FromJava/ActionEnum" {
    export enum ActionEnum {
        edit = "edit",
        error = "error",
        get = "get",
        load = "load",
        move = "move",
        open = "open",
        post = "post",
        read = "read",
        refresh = "refresh",
        save = "save",
        write = "write"
    }
}
declare module "Bridge/FromJava/Response" {
    import { ActionEnum } from "Bridge/FromJava/ActionEnum";
    export default class Response {
        action: ActionEnum;
        key: string;
        data: string;
        message: string;
        status: number;
        constructor(action: ActionEnum, key: string, data: string, message: string, status: number);
    }
}
declare module "Bridge/FromJava/Handler" {
    import Response from "Bridge/FromJava/Response";
    export default interface Handler {
        (data: Response): void;
    }
}
declare module "Bridge/FromJava/HandlerManager" {
    import { ActionEnum } from "Bridge/FromJava/ActionEnum";
    import Handler from "Bridge/FromJava/Handler";
    export default class HandlerManager {
        readonly map: Map<ActionEnum, Map<string, Handler>>;
        constructor();
        make(action: ActionEnum): void;
        add(action: ActionEnum, key: string, handler?: Handler): void;
        find(action: ActionEnum, key: string): Handler | undefined;
    }
}
declare module "Bridge/ToJava/Payload" {
    import { ActionEnum } from "Bridge/FromJava/ActionEnum";
    export default class Payload {
        action: ActionEnum;
        key: string;
        data: string;
        constructor(action: ActionEnum, key: string, data: string);
        static make(action: ActionEnum, key: string, data: string): Payload;
    }
}
declare module "Bridge/FromJava/Worker" {
    import { ActionEnum } from "Bridge/FromJava/ActionEnum";
    import HandlerManager from "Bridge/FromJava/HandlerManager";
    import Response from "Bridge/FromJava/Response";
    export default class Worker {
        readonly manager: HandlerManager;
        constructor(manager: HandlerManager);
        call(response: Response): void;
        isHTTP(action: ActionEnum): boolean;
        error(code: number, message: string): void;
    }
}
declare module "Bridge/ToJava/JavaEntry" {
    export default interface JavaEntry {
        call(json: string): void;
    }
}
declare module "Bridge/CEFW" {
    import Worker from "Bridge/FromJava/Worker";
    import JavaEntry from "Bridge/ToJava/JavaEntry";
    export default interface CEFW extends Window {
        worker: Worker;
        JavaEntry: JavaEntry;
    }
}
declare module "Bridge/ToJava/JavaWorker" {
    import { ActionEnum } from "Bridge/FromJava/ActionEnum";
    import Handler from "Bridge/FromJava/Handler";
    import HandlerManager from "Bridge/FromJava/HandlerManager";
    import CEFW from "Bridge/CEFW";
    export default class JavaWorker {
        readonly window: CEFW;
        readonly manager: HandlerManager;
        constructor(window: CEFW, manager: HandlerManager);
        call(action: ActionEnum, key: string, data: string, handler?: Handler): void;
        edit(file: string, data: string, handler?: Handler): void;
        get(route: string, data: string, handler?: Handler): void;
        move(file: string, destination: string, handler?: Handler): void;
        open(file: string, handler?: Handler): void;
        post(route: string, data: string, handler?: Handler): void;
        read(file: string, data: string, handler?: Handler): void;
        refresh(handler?: Handler): void;
        write(file: string, data: string, handler?: Handler): void;
    }
}
declare module "Entity/Event" {
    import { Emitter } from 'mitt';
    export enum EventEnum {
        ready = 0,
        'sidebar-list-change' = 1
    }
    type Event = Record<EventEnum, any>;
    export type EmitterType = Emitter<Event>;
    export default Event;
}
declare module "Entity/SideBar" {
    import Project from "Entity/Project";
    import SideBarItem from "Entity/SideBarItem";
    import UniqueItemManagerInterface from "Entity/UniqueItemManagerInterface";
    export default class SideBar<T extends SideBarItem = SideBarItem> {
        readonly title: string;
        readonly manager: UniqueItemManagerInterface<T>;
        item: T | null;
        keyword: string;
        constructor(title: string, manager: UniqueItemManagerInterface<T>);
    }
    export enum SideBarEnum {
        Enumer = "Enumer",
        Example = "Example",
        Flow = "Flow",
        Header = "Header",
        Parameter = "Parameter",
        Path = "Path",
        Preset = "Preset",
        Request = "Request",
        Response = "Response",
        Schema = "Schema",
        SecurityScheme = "SecurityScheme",
        Script = "Script",
        Server = "Server",
        ServerVariable = "ServerVariable",
        Tag = "Tag",
        Template = "Template"
    }
    export class SideBarManager {
        readonly map: Map<SideBarEnum, SideBar<SideBarItem>>;
        bind(project: Project): void;
        get(name: SideBarEnum): SideBar<SideBarItem>;
    }
}
declare module "Service/Factory" {
    import Project from "Entity/Project";
    import Schema from "OAPI/Schema";
    export default class Factory {
        readonly project: Project;
        constructor(project: Project);
        makeSchemaField(un: string, schema: Schema): import("OAPI/SchemaField").default;
    }
}
declare module "OAPI/Example" {
    import JSONText from "Entity/JSONText";
    import SideBarItem from "Entity/SideBarItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    export default class Example extends SideBarItem {
        description: string;
        externalValue: string;
        summary: string;
        readonly value: JSONText;
    }
    export class ExampleManager extends UniqueItemManager<Example> {
        constructor();
    }
}
declare module "OAPI/Link" {
    import SideBarItem from "Entity/SideBarItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    export default class Link extends SideBarItem {
    }
    export class LinkManager extends UniqueItemManager<Link> {
        constructor();
    }
}
declare module "OAPI/Parameter" {
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import SideBarItem from "Entity/SideBarItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    import { OAPIReference } from "OAPI/ReferenceInterface";
    import SchemaField, { OAPISchemaField } from "OAPI/SchemaField";
    export enum Location {
        cookie = "cookie",
        header = "header",
        path = "path",
        query = "query"
    }
    interface OAPIParameter {
        allowEmptyValue: boolean;
        deprecated: boolean;
        description: string;
        example?: string;
        in?: string;
        name?: string;
        required: boolean;
        schema: OAPISchemaField | OAPIReference;
    }
    export default class Parameter extends SideBarItem {
        allowEmptyValue: boolean;
        deprecated: boolean;
        description: string;
        example: string;
        location: Location;
        name: string;
        required: boolean;
        readonly schema: SchemaField;
        constructor(name: string, location?: Location);
        toOAPI(finder: ReferenceFinderInterface): OAPIParameter;
    }
    export class ParameterManager extends UniqueItemManager<Parameter> {
        readonly location: Location;
        constructor(location: Location);
        make(name: string): Parameter;
    }
}
declare module "OAPI/MediaType" {
    import JSONText from "Entity/JSONText";
    import ObjectMap from "Entity/ObjectMap";
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import UniqueItem from "Entity/UniqueItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    import Reference, { OAPIReferenceMap, ReferenceManager } from "OAPI/Reference";
    import { OAPIReference } from "OAPI/ReferenceInterface";
    import Schema from "OAPI/Schema";
    export enum MediaTypeEnum {
        form = "multipart/form-data",
        json = "application/json",
        xml = "application/xml"
    }
    export interface OAPIMediaType {
        encoding?: ObjectMap;
        example?: Object;
        examples?: OAPIReferenceMap;
        schema: OAPIReference;
    }
    export default class MediaType extends UniqueItem {
        readonly example: JSONText;
        readonly schema: Reference;
        readonly exampleManager: ReferenceManager;
        makeEncoding(finder: ReferenceFinderInterface, schema: Schema): ObjectMap<any> | undefined;
        toOAPI(finder: ReferenceFinderInterface): OAPIMediaType;
    }
    export class MediaTypeManager extends UniqueItemManager<MediaType> {
        constructor();
    }
}
declare module "OAPI/RequestBody" {
    import ObjectMap from "Entity/ObjectMap";
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import SideBarItem from "Entity/SideBarItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    import { MediaTypeManager, OAPIMediaType } from "OAPI/MediaType";
    interface OAPIRequestBody {
        content: ObjectMap<OAPIMediaType>;
        description: string;
        required: boolean;
    }
    export default class RequestBody extends SideBarItem {
        required: boolean;
        description: string;
        readonly mediaTypeManager: MediaTypeManager;
        toOAPI(finder: ReferenceFinderInterface): OAPIRequestBody;
    }
    export class RequestBodyManager extends UniqueItemManager<RequestBody> {
        constructor();
    }
}
declare module "OAPI/Response" {
    import ObjectMap from "Entity/ObjectMap";
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import SideBarItem from "Entity/SideBarItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    import { MediaTypeManager, OAPIMediaType } from "OAPI/MediaType";
    import { OAPIReferenceMap, ReferenceManager } from "OAPI/Reference";
    interface OAPIResponse {
        content: ObjectMap<OAPIMediaType>;
        description: string;
        headers: OAPIReferenceMap;
    }
    export default class Response extends SideBarItem {
        description: string;
        readonly headerManager: ReferenceManager;
        readonly linkManager: ReferenceManager;
        readonly mediaTypeManager: MediaTypeManager;
        toOAPI(finder: ReferenceFinderInterface): OAPIResponse;
    }
    export class ResponseManager extends UniqueItemManager<Response> {
        constructor();
    }
}
declare module "OAPI/SecurityScheme" {
    import ObjectMap from "Entity/ObjectMap";
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import SideBarItem from "Entity/SideBarItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    import { OAPIOAuthFlow, OAuthFlowManager } from "OAPI/OAuthFlow";
    import { Location } from "OAPI/Parameter";
    export enum SecurityType {
        apiKey = "apiKey",
        http = "http",
        oauth2 = "oauth2",
        openIdConnect = "openIdConnect"
    }
    interface OAPISecurityScheme {
        bearerFormat?: string;
        description: string;
        flows?: ObjectMap<OAPIOAuthFlow>;
        in?: string;
        name?: string;
        openIdConnectUrl?: string;
        scheme?: string;
        type: string;
    }
    export default class SecurityScheme extends SideBarItem {
        type: SecurityType;
        name: string;
        location: Location;
        scheme: string;
        bearerFormat: string;
        openIdConnectUrl: string;
        readonly oAuthFlowManager: OAuthFlowManager;
        constructor(name: string, location?: Location);
        toOAPI(finder: ReferenceFinderInterface): OAPISecurityScheme;
    }
    export class SecuritySchemeManager extends UniqueItemManager<SecurityScheme> {
        constructor();
    }
}
declare module "OAPI/ComponentInterface" {
    import { CallBackManager } from "OAPI/CallBack";
    import { ExampleManager } from "OAPI/Example";
    import { LinkManager } from "OAPI/Link";
    import { ParameterManager } from "OAPI/Parameter";
    import { RequestBodyManager } from "OAPI/RequestBody";
    import { ResponseManager } from "OAPI/Response";
    import { SchemaManager } from "OAPI/Schema";
    import { SecuritySchemeManager } from "OAPI/SecurityScheme";
    export default interface ComponentInterface {
        callbackManager: CallBackManager;
        exampleManager: ExampleManager;
        headerManager: ParameterManager;
        linkManager: LinkManager;
        parameterManager: ParameterManager;
        requestBodyManager: RequestBodyManager;
        responseManager: ResponseManager;
        schemaManager: SchemaManager;
        securitySchemeManager: SecuritySchemeManager;
    }
}
declare module "OAPI/Encoding" {
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import UniqueItem from "Entity/UniqueItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    import { OAPIReferenceMap, ReferenceManager } from "OAPI/Reference";
    interface OAPIEncoding {
        allowReserved?: boolean;
        contentType: string;
        explode?: boolean;
        headers?: OAPIReferenceMap;
        style?: string;
    }
    export default class Encoding extends UniqueItem {
        allowReserved: boolean;
        contentType: string;
        explode: boolean;
        readonly headerManager: ReferenceManager;
        style: string;
        toOAPI(finder: ReferenceFinderInterface): OAPIEncoding;
    }
    export class EncodingManager extends UniqueItemManager<Encoding> {
        constructor();
    }
}
declare module "OAPI/Enumer" {
    import SideBarItem from "Entity/SideBarItem";
    import UniqueItem from "Entity/UniqueItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    export interface OAPIEnumer {
        type: string;
        description: string;
        enum: string[];
    }
    export default class Enumer extends SideBarItem {
        default: string;
        readonly valueManager: UniqueItemManager<UniqueItem>;
        toOAPI(): OAPIEnumer;
    }
    export class EnumerManager extends UniqueItemManager<Enumer> {
        constructor();
    }
}
declare module "OAPI/External" {
    import Item from "Entity/Item";
    export default class External extends Item {
        description: string;
        url: string;
    }
}
declare module "OAPI/Contact" {
    import Item from "Entity/Item";
    export default class Contact extends Item {
        name: string;
        url: string;
        email: string;
        toOAPI(): import("Entity/ObjectMap").default<any>;
    }
}
declare module "OAPI/License" {
    import Item from "Entity/Item";
    export default class License extends Item {
        name: string;
        url: string;
    }
}
declare module "OAPI/Info" {
    import Item from "Entity/Item";
    import Contact from "OAPI/Contact";
    import License from "OAPI/License";
    export default class Info extends Item {
        contact: Contact;
        description: string;
        license: License;
        termsOfService: string;
        title: string;
        version: string;
    }
}
declare module "OAPI/SecurityRequirement" {
    import ObjectMap from "Entity/ObjectMap";
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import { ReferenceManager } from "OAPI/Reference";
    import SecurityScheme from "OAPI/SecurityScheme";
    export type OAPISecurityRequirement = ObjectMap<string[]>;
    export class SecurityRequirementManager extends ReferenceManager {
        constructor();
        toOAPIofTarget(finder: ReferenceFinderInterface, target: SecurityScheme): OAPISecurityRequirement;
        toOAPIArray(finder: ReferenceFinderInterface): any[];
    }
}
declare module "OAPI/Operation" {
    import ObjectMap from "Entity/ObjectMap";
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import UniqueItem from "Entity/UniqueItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    import { CallBackManager } from "OAPI/CallBack";
    import { NameReferenceManager } from "OAPI/NameReference";
    import Path from "OAPI/Path";
    import Reference, { ReferenceManager } from "OAPI/Reference";
    import { OAPIReference } from "OAPI/ReferenceInterface";
    import Response from "OAPI/Response";
    import { OAPISecurityRequirement, SecurityRequirementManager } from "OAPI/SecurityRequirement";
    export const optionxx: string[];
    export enum OperationType {
        get = "get",
        delete = "delete",
        options = "options",
        patch = "patch",
        post = "post",
        put = "put"
    }
    interface OAPIOperation {
        callbacks?: ObjectMap<Response>;
        deprecated: boolean;
        description: string;
        operationId: string;
        parameters?: OAPIReference[];
        requestBody?: OAPIReference;
        responses: ObjectMap<Response>;
        security: OAPISecurityRequirement[];
        summary: string;
        tags: string[];
    }
    export default class Operation extends UniqueItem {
        private readonly path;
        summary: string;
        deprecated: boolean;
        description: string;
        readonly callbackManager: CallBackManager;
        readonly parameterManager: ReferenceManager;
        readonly requestBody: Reference;
        readonly securityManager: SecurityRequirementManager;
        readonly statusManager: NameReferenceManager;
        readonly tagManager: ReferenceManager;
        constructor(name: string, path: Path);
        get type(): string;
        toOAPI(finder: ReferenceFinderInterface): OAPIOperation;
    }
    export class OperationManager extends UniqueItemManager<Operation> {
        readonly path: Path;
        constructor(path: Path);
        make(name: string): Operation;
    }
}
declare module "OAPI/Path" {
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import SideBarItem from "Entity/SideBarItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    import { OperationManager } from "OAPI/Operation";
    import { ReferenceManager } from "OAPI/Reference";
    import { OAPIReference } from "OAPI/ReferenceInterface";
    interface OAPIPath {
        description?: string;
        parameters?: OAPIReference[];
        summary?: string;
    }
    export default class Path extends SideBarItem {
        summary: string;
        readonly operationManager: OperationManager;
        readonly parameterManager: ReferenceManager;
        toOAPI(finder: ReferenceFinderInterface): OAPIPath;
    }
    export class PathManager extends UniqueItemManager<Path> {
        constructor();
    }
}
declare module "OAPI/ServerVariable" {
    import SideBarItem from "Entity/SideBarItem";
    import UniqueItem from "Entity/UniqueItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    export interface OAPIServerVariable {
        default: string;
        description: string;
        enum?: string[];
    }
    export default class ServerVariable extends SideBarItem {
        default: string;
        readonly valueManager: UniqueItemManager<UniqueItem>;
        toOAPI(): OAPIServerVariable;
    }
    export class ServerVariableManager extends UniqueItemManager<ServerVariable> {
        constructor();
    }
}
declare module "OAPI/Server" {
    import ObjectMap from "Entity/ObjectMap";
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import SideBarItem from "Entity/SideBarItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    import { ReferenceManager } from "OAPI/Reference";
    import { OAPIServerVariable } from "OAPI/ServerVariable";
    export interface OAPIServer {
        description: string;
        url: string;
        variables?: ObjectMap<OAPIServerVariable>;
    }
    export default class Server extends SideBarItem {
        readonly variableManager: ReferenceManager;
        get url(): string;
        set url(name: string);
        toOAPI(finder: ReferenceFinderInterface): OAPIServer;
    }
    export class ServerManager extends UniqueItemManager<Server> {
        constructor();
        toOAPIArray(finder: ReferenceFinderInterface): OAPIServer[];
    }
}
declare module "OAPI/Tag" {
    import SideBarItem from "Entity/SideBarItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    interface OAPITag {
        name: string;
        description?: string;
    }
    export default class Tag extends SideBarItem {
        description: string;
        toOAPI(): OAPITag;
    }
    export class TagManager extends UniqueItemManager<Tag> {
        constructor();
    }
}
declare module "OAPI/DocumentInterface" {
    import ComponentInterface from "OAPI/ComponentInterface";
    import { EncodingManager } from "OAPI/Encoding";
    import { EnumerManager } from "OAPI/Enumer";
    import External from "OAPI/External";
    import Info from "OAPI/Info";
    import { PathManager } from "OAPI/Path";
    import SchemaField, { SchemaFieldManager } from "OAPI/SchemaField";
    import { ScopeManager } from "OAPI/Scope";
    import { SecurityRequirementManager } from "OAPI/SecurityRequirement";
    import { ServerManager } from "OAPI/Server";
    import { ServerVariableManager } from "OAPI/ServerVariable";
    import { TagManager } from "OAPI/Tag";
    export default interface DocumentInterface {
        component: ComponentInterface;
        encodingManager: EncodingManager;
        enumerManager: EnumerManager;
        externalDocs: External;
        fieldManager: SchemaFieldManager;
        info: Info;
        pathManager: PathManager;
        scopeManager: ScopeManager;
        securityManager: SecurityRequirementManager;
        serverManager: ServerManager;
        serverVariableManager: ServerVariableManager;
        tagManager: TagManager;
        importSchema(fieldxx: SchemaField[], ui: number): void;
    }
}
declare module "Entity/Property" {
    import UniqueItem from "Entity/UniqueItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    export default class Property extends UniqueItem {
        tag: string;
        value: string;
    }
    export class PropertyManager extends UniqueItemManager<Property> {
        readonly list: Array<Property>;
        constructor();
    }
}
declare module "Entity/Preset" {
    import { PropertyManager } from "Entity/Property";
    import SideBarItem from "Entity/SideBarItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    export default class Preset extends SideBarItem {
        description: string;
        version: number;
        readonly propertyManager: PropertyManager;
    }
    export class PresetManager extends UniqueItemManager<Preset> {
        readonly list: Array<Preset>;
        constructor();
    }
}
declare module "Entity/Script" {
    import SideBarItem from "Entity/SideBarItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    export default class Script extends SideBarItem {
        code: string;
        description: string;
        requireLayer: boolean;
        requireSchema: boolean;
    }
    export class ScriptManager extends UniqueItemManager<Script> {
        readonly list: Array<Script>;
        constructor();
    }
}
declare module "Entity/Template" {
    import SideBarItem from "Entity/SideBarItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    export default class Template extends SideBarItem {
        code: string;
        description: string;
    }
    export class TemplateManager extends UniqueItemManager<Template> {
        readonly list: Array<Template>;
        constructor();
    }
}
declare module "Entity/ProjectInterface" {
    import DocumentInterface from "OAPI/DocumentInterface";
    import { LayerPathManager } from "Entity/LayerPath";
    import Preset, { PresetManager } from "Entity/Preset";
    import { ScriptManager } from "Entity/Script";
    import { TemplateManager } from "Entity/Template";
    export default interface ProjectInterface {
        flowManager: LayerPathManager;
        presetManager: PresetManager;
        scriptManager: ScriptManager;
        templateManager: TemplateManager;
        oapi: DocumentInterface;
        getPreset(name: string): Preset | undefined;
    }
}
declare module "Service/SchemaFieldFinder" {
    import Schema, { SchemaManager } from "OAPI/Schema";
    import { SchemaFieldManager } from "OAPI/SchemaField";
    export default class SchemaFieldFinder {
        readonly fieldManager: SchemaFieldManager;
        readonly schemaManager: SchemaManager;
        constructor(fieldManager: SchemaFieldManager, schemaManager: SchemaManager);
        getFieldList(schema: Schema): import("OAPI/SchemaField").default[];
        private getReferenceList;
    }
}
declare module "Service/ReferenceFinder" {
    import ProjectInterface from "Entity/ProjectInterface";
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import UniqueItemInterface from "Entity/UniqueItemInterface";
    import UniqueItemManagerInterface from "Entity/UniqueItemManagerInterface";
    import Reference from "OAPI/Reference";
    import Schema from "OAPI/Schema";
    import TargetType from "OAPI/TargetType";
    import SchemaFieldFinder from "Service/SchemaFieldFinder";
    export default class ReferenceFinder implements ReferenceFinderInterface {
        readonly project: ProjectInterface;
        readonly schemaFieldFinder: SchemaFieldFinder;
        constructor(project: ProjectInterface);
        find<T extends UniqueItemInterface>(reference: Reference): T | undefined;
        findByUI<T extends UniqueItemInterface>(ui: number, type: TargetType): T | undefined;
        private getManager;
        findManager(type: TargetType): UniqueItemManagerInterface;
        getSchemaFieldList(schema: Schema): import("OAPI/SchemaField").default[];
    }
}
declare module "Vendor" {
    import JavaWorker from "Bridge/ToJava/JavaWorker";
    import { EmitterType } from "Entity/Event";
    import Project from "Entity/Project";
    import { SideBarManager } from "Entity/SideBar";
    import Factory from "Service/Factory";
    import ReferenceFinder from "Service/ReferenceFinder";
    export default class Vendor {
        readonly worker: JavaWorker;
        readonly emitter: EmitterType;
        private _data;
        private _preset;
        private _project;
        readonly sbManager: SideBarManager;
        constructor(data: Project, worker: JavaWorker, emitter: EmitterType);
        createProject(): void;
        get data(): Project;
        setData(data: Project): void;
        get preset(): Project;
        get project(): Project;
        set project(project: Project);
        get callbackManager(): import("OAPI/CallBack").CallBackManager;
        get encodingManager(): import("OAPI/Encoding").EncodingManager;
        get enumerManager(): import("OAPI/Enumer").EnumerManager;
        get exampleManager(): import("OAPI/Example").ExampleManager;
        get factory(): Factory;
        get fieldManager(): import("OAPI/SchemaField").SchemaFieldManager;
        get finder(): ReferenceFinder;
        get headerManager(): import("OAPI/Parameter").ParameterManager;
        get parameterManager(): import("OAPI/Parameter").ParameterManager;
        get pathManager(): import("OAPI/Path").PathManager;
        get requestBodyManager(): import("OAPI/RequestBody").RequestBodyManager;
        get responseManager(): import("OAPI/Response").ResponseManager;
        get schemaManager(): import("OAPI/Schema").SchemaManager;
        get scopeManager(): import("OAPI/Scope").ScopeManager;
        get securityRequirementManager(): import("OAPI/SecurityRequirement").SecurityRequirementManager;
        get securitySchemeManager(): import("OAPI/SecurityScheme").SecuritySchemeManager;
        get serverManager(): import("OAPI/Server").ServerManager;
        get serverVariableManager(): import("OAPI/ServerVariable").ServerVariableManager;
        get tagManager(): import("OAPI/Tag").TagManager;
    }
}
declare module "Service/Text" {
    import DataForScript from "DataForScript";
    import LayerOperation from "Entity/LayerOperation";
    import LayerPath from "Entity/LayerPath";
    import UniqueItemInterface from "Entity/UniqueItemInterface";
    import Schema from "OAPI/Schema";
    import Vendor from "Vendor";
    export function filter(keyword: string, list: Array<UniqueItemInterface>): UniqueItemInterface[];
    function getUN(pattern: string, schema: Schema, path: LayerPath, operation: LayerOperation): string;
    function parse(text: string, data: object): string;
    function run(code: string, vendor: Vendor, schema?: Schema, un?: string): any;
    function runFunction(code: string, data: DataForScript): any;
    const Text: {
        filter: typeof filter;
        getUN: typeof getUN;
        parse: typeof parse;
        run: typeof run;
        runFunction: typeof runFunction;
    };
    export default Text;
}
declare module "Entity/UniqueItemManager" {
    import Newable from "Entity/Newable";
    import ObjectMap from "Entity/ObjectMap";
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import UIItemManager from "Entity/UIItemManager";
    import UniqueItemInterface from "Entity/UniqueItemInterface";
    import UniqueItemManagerInterface from "Entity/UniqueItemManagerInterface";
    export default class UniqueItemManager<T extends UniqueItemInterface = UniqueItemInterface> extends UIItemManager<T> implements UniqueItemManagerInterface {
        readonly unique: boolean;
        constructor(type: Newable<T>, unique?: boolean);
        add(item: T): void;
        static arrayToOAPI<T extends UniqueItemInterface = UniqueItemInterface>(list: T[], finder: ReferenceFinderInterface): ObjectMap<any>;
        arrayToOAPI(list: T[], finder: ReferenceFinderInterface): ObjectMap<any>;
        changeUN(item: T, un: string): void;
        filter(keyword: string): UniqueItemInterface[];
        findByUN(name: string): T | undefined;
        findByUNOrMakeAdd(name: string): T;
        hasSame(ui: number, un: string): boolean;
        hasUN(name: string): boolean;
        protected loadItem(item: UniqueItemInterface): T;
        make(name: string): T;
        sort(asc?: boolean): void;
        throwIfFindUN(name: string): void;
        throwIfNotUnique(item: T): void;
        toJSON(): {
            nextUI: number;
            list: T[];
        };
        toOAPI(finder: ReferenceFinderInterface): ObjectMap<any>;
        get unxx(): string[];
    }
}
declare module "OAPI/CallBack" {
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import UniqueItem from "Entity/UniqueItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    import Reference from "OAPI/Reference";
    export default class CallBack extends UniqueItem {
        readonly path: Reference;
        toOAPI(finder: ReferenceFinderInterface): import("OAPI/ReferenceInterface").OAPIReference;
    }
    export class CallBackManager extends UniqueItemManager<CallBack> {
        constructor();
    }
}
declare module "OAPI/Component" {
    import Item from "Entity/Item";
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import { CallBackManager } from "OAPI/CallBack";
    import ComponentInterface from "OAPI/ComponentInterface";
    import { ExampleManager } from "OAPI/Example";
    import { LinkManager } from "OAPI/Link";
    import { ParameterManager } from "OAPI/Parameter";
    import { RequestBodyManager } from "OAPI/RequestBody";
    import { ResponseManager } from "OAPI/Response";
    import { SchemaManager } from "OAPI/Schema";
    import { SecuritySchemeManager } from "OAPI/SecurityScheme";
    export default class Component extends Item implements ComponentInterface {
        readonly callbackManager: CallBackManager;
        readonly exampleManager: ExampleManager;
        readonly headerManager: ParameterManager;
        readonly linkManager: LinkManager;
        readonly parameterManager: ParameterManager;
        readonly requestBodyManager: RequestBodyManager;
        readonly responseManager: ResponseManager;
        readonly schemaManager: SchemaManager;
        readonly securitySchemeManager: SecuritySchemeManager;
        toOAPI(finder: ReferenceFinderInterface): {
            callbacks: import("Entity/ObjectMap").default<any>;
            examples: import("Entity/ObjectMap").default<any>;
            headers: import("Entity/ObjectMap").default<any>;
            links: import("Entity/ObjectMap").default<any>;
            parameters: import("Entity/ObjectMap").default<any>;
            requestBodies: import("Entity/ObjectMap").default<any>;
            responses: import("Entity/ObjectMap").default<any>;
            schemas: import("Entity/ObjectMap").default<any>;
            securitySchemes: import("Entity/ObjectMap").default<any>;
        };
    }
}
declare module "OAPI/Document" {
    import Item from "Entity/Item";
    import ReferenceFinderInterface from "Entity/ReferenceFinderInterface";
    import Component from "OAPI/Component";
    import DocumentInterface from "OAPI/DocumentInterface";
    import { EncodingManager } from "OAPI/Encoding";
    import { EnumerManager } from "OAPI/Enumer";
    import External from "OAPI/External";
    import Info from "OAPI/Info";
    import { PathManager } from "OAPI/Path";
    import SchemaField, { SchemaFieldManager } from "OAPI/SchemaField";
    import { ScopeManager } from "OAPI/Scope";
    import { SecurityRequirementManager } from "OAPI/SecurityRequirement";
    import { ServerManager } from "OAPI/Server";
    import { ServerVariableManager } from "OAPI/ServerVariable";
    import { TagManager } from "OAPI/Tag";
    export default class Document extends Item implements DocumentInterface {
        readonly component: Component;
        readonly encodingManager: EncodingManager;
        readonly enumerManager: EnumerManager;
        readonly externalDocs: External;
        readonly fieldManager: SchemaFieldManager;
        readonly info: Info;
        readonly pathManager: PathManager;
        readonly scopeManager: ScopeManager;
        readonly securityManager: SecurityRequirementManager;
        readonly serverManager: ServerManager;
        readonly serverVariableManager: ServerVariableManager;
        readonly tagManager: TagManager;
        importSchema(fieldxx: SchemaField[], ui: number): void;
        private removeNullReference;
        toOAPI(finder: ReferenceFinderInterface): {
            openapi: string;
            info: import("Entity/ObjectMap").default<any>;
            components: {
                callbacks: import("Entity/ObjectMap").default<any>;
                examples: import("Entity/ObjectMap").default<any>;
                headers: import("Entity/ObjectMap").default<any>;
                links: import("Entity/ObjectMap").default<any>;
                parameters: import("Entity/ObjectMap").default<any>;
                requestBodies: import("Entity/ObjectMap").default<any>;
                responses: import("Entity/ObjectMap").default<any>;
                schemas: import("Entity/ObjectMap").default<any>;
                securitySchemes: import("Entity/ObjectMap").default<any>;
            };
            paths: import("Entity/ObjectMap").default<any>;
            security: any[];
            servers: import("OAPI/Server").OAPIServer[];
            tags: any[];
            externalDocs: import("Entity/ObjectMap").default<any>;
        };
    }
}
declare module "Entity/Project" {
    import Document from "OAPI/Document";
    import Item from "Entity/Item";
    import { LayerPathManager } from "Entity/LayerPath";
    import { PresetManager } from "Entity/Preset";
    import ProjectInterface from "Entity/ProjectInterface";
    import { ScriptManager } from "Entity/Script";
    import { TemplateManager } from "Entity/Template";
    export default class Project extends Item implements ProjectInterface {
        version: number;
        readonly flowManager: LayerPathManager;
        readonly presetManager: PresetManager;
        readonly scriptManager: ScriptManager;
        readonly templateManager: TemplateManager;
        readonly oapi: Document;
        getPreset(name: string): import("Entity/Preset").default | undefined;
    }
}
declare module "DataForScript" {
    import { LoDashStatic } from 'lodash';
    import ColorEnum from "Entity/ColorEnum";
    import Project from "Entity/Project";
    import Schema from "OAPI/Schema";
    import Factory from "Service/Factory";
    import Vendor from "Vendor";
    export default interface DataForScript {
        color: typeof ColorEnum;
        factory: Factory;
        lodash: LoDashStatic;
        project: Project;
        schema?: Schema;
        vendor: Vendor;
    }
}
declare module "Bridge/FromJava/StatusEnum" {
    export enum StatusEnum {
        OK = 200,
        Error = 400
    }
}
declare module "Entity/ImportItem" {
    import UniqueItem from "Entity/UniqueItem";
    import UniqueItemManager from "Entity/UniqueItemManager";
    export default class ImportItem extends UniqueItem {
        required: boolean;
        value: string;
    }
    export class ImportItemManager extends UniqueItemManager<ImportItem> {
        readonly list: Array<ImportItem>;
        constructor();
    }
}
declare module "Entity/Modal" {
    export default class Modal {
        callback: CallableFunction;
        size: string;
        title: string;
        visible: boolean;
        hide(): void;
        protected show(title: string, callback: CallableFunction): void;
    }
}
declare module "Entity/InputModal" {
    import Modal from "Entity/Modal";
    interface CallBack {
        (): boolean;
    }
    export default class InputModal extends Modal {
        text: string;
        size: string;
        ok(): void;
        show(title: string, callback: CallBack): void;
    }
}
declare module "Entity/ListModal" {
    import Modal from "Entity/Modal";
    import UniqueItemInterface from "Entity/UniqueItemInterface";
    interface CallBack {
        (item: UniqueItemInterface): void;
    }
    export default class ListModal extends Modal {
        keyword: string;
        source: Array<UniqueItemInterface>;
        withBlank: boolean;
        get list(): UniqueItemInterface[];
        select(item: UniqueItemInterface): void;
        showList(list: Array<UniqueItemInterface>, title: string, callback: CallBack): void;
        showWithBlank(list: Array<UniqueItemInterface>, title: string, callback: CallBack): void;
    }
}
declare module "Entity/Menu" {
    export default class Menu {
        readonly title: string;
        readonly path: string;
        readonly redirect: string;
        readonly component: Function | null;
        readonly menuxx: Menu[];
        constructor(title: string, path: string, redirect: string, component?: Function | null, menuxx?: Menu[]);
    }
}
declare module "Entity/MenuGroup" {
    import Menu from "Entity/Menu";
    export default class MenuGroup {
        readonly title: string;
        readonly menuxx: Menu[];
        constructor(title: string, menuxx?: Menu[]);
    }
}
declare module "OAPI/XML" {
    import Item from "Entity/Item";
    export default class XML extends Item {
        attribute: boolean;
        name: string;
        namespace: string;
        prefix: string;
        wrapped: boolean;
    }
}
declare module "Service/Converter" {
    import ObjectMap from "Entity/ObjectMap";
    export function migrate(data: ObjectMap[], keymap: Map<string, string>): ObjectMap<string>[];
    const Converter: {
        migrate: typeof migrate;
    };
    export default Converter;
}
declare module "Service/File" {
    import Handler from "Bridge/FromJava/Handler";
    import JavaWorker from "Bridge/ToJava/JavaWorker";
    export default class File {
        readonly worker: JavaWorker;
        constructor(worker: JavaWorker);
        static getOAPIPath(file: string): string;
        static getScriptPath(file: string): string;
        static getTemplatePath(file: string): string;
        move(file: string, destination: string, handler?: Handler): void;
        read(file: string, data: string, handler?: Handler): void;
        readOAPI(file: string, data: string, handler?: Handler): void;
        saveDTS(): void;
        write(file: string, data: string, handler?: Handler): void;
        writeOAPI(data: string, handler?: Handler): void;
        writeScript(file: string, data: string, handler?: Handler): void;
    }
}
declare module "Service/Load" {
    import Project from "Entity/Project";
    export default class Load {
        static run(source: Project, preset: Project): Project;
        private static loadPreset;
        private static addIfNotExist;
        private static isProject;
    }
}
declare module "Service/MakeDiagram" {
    import { Edge, Node } from '@antv/x6';
    import LayerPath from "Entity/LayerPath";
    import Schema from "OAPI/Schema";
    import ReferenceFinder from "Service/ReferenceFinder";
    export default function MakeDiagram(layer: LayerPath, schema: Schema, finder: ReferenceFinder): {
        edges: Edge<Edge.Properties>[];
        nodes: Node<Node.Properties>[];
    };
}
declare module "Service/MakeFlow" {
    import Schema from "OAPI/Schema";
    import Vendor from "Vendor";
    export default function MakeFlow(schema: Schema, vendor: Vendor): void;
}
declare module "Service/Save" {
    import Handler from "Bridge/FromJava/Handler";
    import Project from "Entity/Project";
    import File from "Service/File";
    export default class Save {
        static last: string;
        private static readonly fake;
        static run(file: File, project: Project, handler?: Handler): void;
        private static makeName;
    }
}
declare module "Service/Start" {
    import CEFW from "Bridge/CEFW";
    import { EmitterType } from "Entity/Event";
    import Project from "Entity/Project";
    import Vendor from "Vendor";
    export default class Start {
        static run(preset: Project, emitter: EmitterType, window: CEFW): Vendor;
    }
}
declare module "Service/Toast" {
    function error(error: any): void;
    function show(message: string, code: number): void;
    function success(message: string): void;
    const Toast: {
        error: typeof error;
        show: typeof show;
        success: typeof success;
    };
    export default Toast;
}
declare module "Service/Timer" {
    function wait(callback: Function): {
        run: () => void;
        stopWaiting: (timeout?: number) => void;
        waiting: import("vue").Ref<boolean>;
    };
    const Timer: {
        wait: typeof wait;
    };
    export default Timer;
}
